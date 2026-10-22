# Horas â€” atividades complementares

AplicaÃ§Ã£o estÃ¡tica em portuguÃªs para planejar e acompanhar uma meta de 90 horas. Regras das 24 categorias transcritas das imagens do manual fornecidas nesta conversa. NÃ£o Ã© um sistema oficial da CESAR School.

## Executar

Requer Node.js 22 ou superior, sem dependÃªncias de instalaÃ§Ã£o.

```powershell
cd D:\programacao\horas_cesar\horas-complementares
npm start
```

Abra http://127.0.0.1:4173. Execute `npm test` para verificar as regras de cÃ¡lculo.

## Funcionamento

- Cadastro, ediÃ§Ã£o, exclusÃ£o, busca e filtros de atividades.
- SimulaÃ§Ã£o ao preencher; conversÃµes por horas, meses, semestres e unidades; limite por categoria.
- Aprovadas tÃªm prioridade sobre enviadas; enviadas tÃªm prioridade sobre simuladas. Dentro de cada situaÃ§Ã£o, a ordem de cadastro define a ocupaÃ§Ã£o do limite. Uma ediÃ§Ã£o preserva a posiÃ§Ã£o original.
- O saldo para concluir as 90 horas considera apenas aprovadas. A previsÃ£o soma todos os estados e pode ultrapassar a meta, mas nunca o limite de cada categoria.
- SituaÃ§Ã£o de aprovaÃ§Ã£o declarada pelo aluno. Sem envio automÃ¡tico ou integraÃ§Ã£o com a faculdade.
- Comprovantes PDF, PNG, JPG e WebP de atÃ© 5 MB. Dados e anexos em IndexedDB, apenas no navegador e na origem usada. NÃ£o hÃ¡ conta ou sincronizaÃ§Ã£o entre dispositivos. A versÃ£o local e a publicada tÃªm armazenamentos separados. Limpar os dados do navegador apaga os registros.
- Backup e restauraÃ§Ã£o em JSON, incluindo comprovantes. RestauraÃ§Ã£o substitui os registros mediante confirmaÃ§Ã£o. Guarde o arquivo com cuidado: pode conter dados pessoais.

## Premissas que precisam ser confirmadas no regulamento completo

Nas categorias sem conversÃ£o explÃ­cita, foi adotada a carga horÃ¡ria declarada/comprovada, sujeita Ã  avaliaÃ§Ã£o da faculdade. PerÃ­odos de 6 meses contabilizam somente blocos completos; eventual tratamento de perÃ­odos adicionais precisa ser confirmado. Concursos/competiÃ§Ãµes aceitam uma estimativa de atÃ© 25 horas por participaÃ§Ã£o. Outras atividades dependem de NDE/diretoria. Checklists sÃ£o declaraÃ§Ãµes do aluno, nÃ£o anÃ¡lise automatizada de documentos.

NÃ£o hÃ¡ OCR, validaÃ§Ã£o de autenticidade, detecÃ§Ã£o automÃ¡tica de certificados repetidos nem conferÃªncia automÃ¡tica das datas de inÃ­cio/fim do curso. Cada realizaÃ§Ã£o deve ser cadastrada uma Ãºnica vez. A versÃ£o/data do manual e regras gerais fora das tabelas ainda precisam ser fornecidas. MudanÃ§as em `dist/rules.js` afetam os cÃ¡lculos de todos os registros existentes.

## Arquivos

`dist/rules.js`: regras e cÃ¡lculo; `dist/app.js`: interface e armazenamento; `dist/styles.css`: layout responsivo; `tests/rules.test.js`: testes; `server.mjs`: servidor local restrito ao diretÃ³rio dist.

Sem ferramentas de build. A pasta `dist` pode ser hospedada diretamente. A fonte Google Fonts Ã© opcional; sem rede, o layout usa fontes locais.
