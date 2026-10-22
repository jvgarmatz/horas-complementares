import {test} from 'node:test';
import assert from 'node:assert/strict';
import {clearWorkspace} from '../dist/storage.js';

function databaseStub(){
  const calls=[];
  const transaction={objectStore(name){calls.push(['store',name]);return {clear(){calls.push(['clear']);}};}};
  const database={transaction(name,mode){calls.push(['transaction',name,mode]);return transaction;}};
  return {database,transaction,calls};
}

test('exclusão usa uma única transação no armazenamento da aplicação e aguarda a confirmação',async()=>{
  const {database,transaction,calls}=databaseStub();
  let finished=false;
  const result=clearWorkspace(database).then(()=>{finished=true;});
  await Promise.resolve();
  assert.equal(finished,false);
  assert.deepEqual(calls,[['transaction','data','readwrite'],['store','data'],['clear']]);
  transaction.oncomplete();
  await result;
  assert.equal(finished,true);
});

test('transação abortada não informa que a exclusão foi concluída',async()=>{
  const {database,transaction}=databaseStub();
  const result=clearWorkspace(database);
  const rejection=assert.rejects(result,/preservados/);
  transaction.onabort();
  await rejection;
});

test('falhas de armazenamento são propagadas para a interface',async()=>{
  const {database,transaction}=databaseStub();
  const result=clearWorkspace(database);
  const rejection=assert.rejects(result,/Não foi possível apagar/);
  transaction.onerror();
  await rejection;
  await assert.rejects(clearWorkspace({transaction(){throw Error('Armazenamento indisponível');}}),/indisponível/);
});
