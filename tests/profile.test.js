import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateProfile,summarize,createBackup,restoreBackup,RULESET} from '../dist/profile.js';

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
