// Limpa apenas o armazenamento desta aplicação. A interface só deve ser
// reiniciada depois que a transação inteira tiver sido confirmada.
export function clearWorkspace(database){
  return new Promise((resolve,reject)=>{
    const transaction=database.transaction('data','readwrite');
    transaction.objectStore('data').clear();
    transaction.oncomplete=()=>resolve();
    transaction.onerror=()=>reject(Error('Não foi possível apagar os dados. Tente novamente.'));
    transaction.onabort=()=>reject(Error('A exclusão foi cancelada pelo navegador. Seus dados foram preservados.'));
  });
}
