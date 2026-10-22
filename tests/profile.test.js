import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateProfile,summarize,createBackup,restoreBackup,RULESET,COURSES,createCourseProfile,findProfileCourse} from '../dist/profile.js';

const profile={name:'Ana Silva',course:'Design',goal:120};
const records=[{id:'estagio',title:'Estágio',category:'estagio',amount:6,status:'approved',date:'2026-10-22',checks:[],notes:'',evidence:null},{id:'curso',title:'Curso externo',category:'cursos',amount:30,status:'simulated',date:'2026-10-22',checks:[true],notes:'',evidence:{type:'application/pdf',name:'curso.pdf',data:'data:application/pdf;base64,JVBERg=='}}];

test('perfil normaliza espaços e aceita nomes e cursos livres',()=>{
  assert.deepEqual(validateProfile({...profile,name:'  Ana Silva ',course:' Design '}),profile);
});
test('perfil rejeita dados ausentes e metas inválidas',()=>{
  for(const goal of [0,-1,NaN,Infinity,10001,'120',0.001])assert.throws(()=>validateProfile({...profile,goal}));
  for(const field of ['name','course'])assert.throws(()=>validateProfile({...profile,[field]:'  '}));
  assert.doesNotThrow(()=>validateProfile({...profile,goal:60.5}));
});
test('metas maiores e menores alteram o saldo sem modificar atividades e limites',()=>{
  const original=structuredClone(records);
  const higher=summarize(records,profile),lower=summarize(records,{...profile,goal:40});
  assert.equal(higher.remaining,70);
  assert.equal(higher.projectedRemaining,50);
  assert.equal(lower.remaining,0);
  assert.equal(lower.percent,100);
  assert.equal(lower.used.cursos,20);
  assert.equal(higher.used.cursos,20);
  assert.deepEqual(records,original);
});
test('backup novo restaura perfil, meta e comprovantes',()=>{
  const backup=JSON.parse(JSON.stringify(createBackup(records,profile)));
  assert.deepEqual(restoreBackup(backup),{profile,records});
});
test('backup antigo preserva a meta e o perfil configurados',()=>{
  assert.deepEqual(restoreBackup({version:1,goal:90,records},profile),{profile,records});
});
test('backup antigo no primeiro acesso permite configurar o perfil depois',()=>{
  assert.deepEqual(restoreBackup({version:1,goal:90,records}),{profile:null,records});
});
test('backup de outro regulamento ou inválido não substitui os dados',()=>{
  const current=structuredClone({profile,records});
  assert.throws(()=>restoreBackup({...createBackup(records,profile),ruleSet:'outro'}));
  assert.throws(()=>restoreBackup({version:2,ruleSet:RULESET,profile:{...profile,goal:0},records}));
  assert.throws(()=>restoreBackup(createBackup([records[0],records[0]],profile)));
  assert.deepEqual({profile,records},current);
});

test('os oito cursos preenchem as metas conforme a modalidade',()=>{
  assert.equal(COURSES.length,8);
  assert.equal(new Set(COURSES.map(course=>course.id)).size,8);
  for(const course of COURSES){
    const configured=createCourseProfile(' Ana ',course.id);
    assert.equal(configured.goal,course.group==='Cursos de Bacharelado'?120:90);
    assert.equal(configured.course,course.name);
    assert.equal(configured.name,'Ana');
  }
});
test('meta vinculada ao curso não pode ser substituída pelo campo do formulário ou backup',()=>{
  const configured=createCourseProfile('Ana','design');
  assert.equal(validateProfile({...configured,goal:90,course:'ADS'}).goal,120);
  assert.equal(validateProfile({...configured,course:'ADS'}).course,'Design');
  assert.throws(()=>createCourseProfile('Ana','inexistente'));
  assert.throws(()=>validateProfile({...configured,courseId:'inexistente'}));
});
test('reconhece cursos de perfis antigos por nome ou sigla sem migrar a meta silenciosamente',()=>{
  assert.equal(findProfileCourse({course:'  ciencia da computacao '}).id,'ciencia-computacao');
  assert.equal(findProfileCourse({course:'ADS'}).id,'ads');
  assert.equal(findProfileCourse({course:'GTI'}).id,'gti');
  assert.equal(findProfileCourse({course:'Outro curso'}),null);
  const legacy={...profile,goal:90};
  assert.equal(validateProfile(legacy).goal,90);
  assert.equal(createCourseProfile(legacy.name,findProfileCourse(legacy).id).goal,120);
});
test('troca de tecnológico para bacharelado recalcula o saldo sem alterar atividades',()=>{
  const original=structuredClone(records);
  const ads=summarize(records,createCourseProfile('Ana','ads'));
  const computing=summarize(records,createCourseProfile('Ana','ciencia-computacao'));
  assert.equal(ads.remaining,40);
  assert.equal(computing.remaining,70);
  assert.deepEqual(records,original);
});
test('backup preserva o curso selecionado e sua meta automática',()=>{
  const configured=createCourseProfile('Ana','sistemas-informacao');
  assert.deepEqual(restoreBackup(JSON.parse(JSON.stringify(createBackup(records,configured)))).profile,configured);
});
