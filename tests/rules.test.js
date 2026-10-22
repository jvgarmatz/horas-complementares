import {test} from 'node:test';
import assert from 'node:assert/strict';
import {categories,baseHours,calculate,validateRecord,categoryCapacity,assertCategoryAvailable} from '../dist/rules.js';
const record=(id,category,amount,status='simulated')=>({id,title:'Atividade',category,amount,status,date:'2026-10-22',notes:'',checks:categories.find(c=>c.id===category).checks.map(()=>true),evidence:null});
test('24 categorias com limites e identificadores únicos',()=>{assert.equal(categories.length,24);assert.equal(new Set(categories.map(c=>c.id)).size,24);});
test('workshop de 8 horas com saldo de 2 horas',()=>{const c=calculate([record('a','workshops',36,'approved'),record('b','workshops',8)]);assert.deepEqual(c.results.get('b'),{base:4,credited:2,excluded:2});assert.equal(c.total,20);});
test('aprovadas ocupam o limite antes das enviadas e simuladas',()=>{const c=calculate([record('a','cursos',20),record('b','cursos',10,'pending'),record('c','cursos',15,'approved')]);assert.deepEqual(c.totals,{approved:15,pending:5,simulated:0});});
test('períodos de seis meses completos',()=>{assert.equal(baseHours(record('a','pesquisa',5)),0);assert.equal(baseHours(record('b','pesquisa',11)),25);assert.equal(baseHours(record('c','pesquisa',12)),50);assert.equal(baseHours(record('d','estagio',6)),50);});
test('monitorias e publicações têm conversão por unidade',()=>{assert.equal(baseHours(record('a','monitoria',2)),30);assert.equal(baseHours(record('b','artigo-referee',2)),50);assert.equal(baseHours(record('c','resumo',2)),20);});
test('meta de 90h e limites independentes',()=>{const c=calculate([record('a','estagio',6,'approved'),record('b','cursos',20,'approved'),record('c','congressos',20,'approved')]);assert.equal(c.total,90);assert.equal(c.totals.approved,90);});
test('limite fixo de portfólio não é duplicado',()=>{const c=calculate([record('a','portfolio',15),record('b','portfolio',15)]);assert.equal(c.total,15);assert.equal(c.results.get('b').credited,0);});
test('concursos não ultrapassam 25h por participação',()=>{assert.throws(()=>baseHours(record('a','competicao',26)));assert.equal(baseHours(record('b','competicao',12)),12);});
test('valores inválidos não entram no cálculo',()=>{for(const v of [0,-1,NaN,Infinity])assert.throws(()=>baseHours(record('a','cursos',v)));assert.throws(()=>baseHours(record('a','monitoria',1.5)));});
test('backup valida categoria, status e tipo de comprovante',()=>{assert.doesNotThrow(()=>validateRecord(record('a','cursos',10)));assert.throws(()=>validateRecord({...record('a','cursos',10),status:'other'}));assert.throws(()=>validateRecord({...record('a','cursos',10),category:'unknown'}));assert.throws(()=>validateRecord({...record('a','cursos',10),evidence:{type:'text/html',name:'a.html',data:'data:text/html;base64,abc'}}));});
test('comprovante de 5MB passa sem estourar a pilha de validação',()=>{const r=record('a','cursos',10);r.evidence={name:'arquivo.pdf',type:'application/pdf',data:'data:application/pdf;base64,'+Buffer.alloc(5*1024*1024).toString('base64')};assert.doesNotThrow(()=>validateRecord(r));r.evidence.data='data:application/pdf;base64,'+Buffer.alloc(5*1024*1024+1).toString('base64');assert.throws(()=>validateRecord(r));});
test('backup rejeita datas inexistentes e chaves herdadas como status',()=>{assert.throws(()=>validateRecord({...record('a','cursos',10),date:'2026-02-30'}));assert.throws(()=>validateRecord({...record('a','cursos',10),status:'__proto__'}));});

test('categoria completa bloqueia novos registros em qualquer situação',()=>{
  for(const status of ['approved','pending','simulated']){
    const records=[record('a','cursos',20,status)];
    assert.deepEqual(categoryCapacity(records,'cursos'),{used:20,remaining:0,cap:20,full:true});
    assert.throws(()=>assertCategoryAvailable(records,'cursos'),/limite de 20 horas/);
  }
});
test('conversões e limites fixos também bloqueiam novos certificados',()=>{
  assert.throws(()=>assertCategoryAvailable([record('a','workshops',40)],'workshops'));
  assert.throws(()=>assertCategoryAvailable([record('a','portfolio',15)],'portfolio'));
});
test('saldo parcial continua aceitando atividade com aproveitamento limitado ao saldo',()=>{
  const records=[record('a','cursos',18)];
  assert.equal(assertCategoryAvailable(records,'cursos').remaining,2);
  const c=calculate([...records,record('b','cursos',10)]);
  assert.equal(c.results.get('b').credited,2);
});
test('permite editar uma atividade da categoria completa mas bloqueia transferir outra para ela',()=>{
  const records=[record('a','cursos',20),record('b','congressos',5)];
  assert.doesNotThrow(()=>assertCategoryAvailable(records,'cursos','a'));
  assert.throws(()=>assertCategoryAvailable(records,'cursos','b'));
  assert.throws(()=>assertCategoryAvailable(records,'cursos','id-inexistente'));
});
test('reduzir ou excluir registros libera a categoria novamente',()=>{
  const records=[record('a','cursos',20)];
  assert.throws(()=>assertCategoryAvailable(records,'cursos'));
  assert.equal(assertCategoryAvailable([{...records[0],amount:10}],'cursos').remaining,10);
  assert.equal(assertCategoryAvailable([],'cursos').remaining,20);
});
