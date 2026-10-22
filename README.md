# Horas — atividades complementares

Aplicação estática em português para planejar e acompanhar uma meta de 90 horas. Regras das 24 categorias transcritas das imagens do manual fornecidas nesta conversa. Não é um sistema oficial da CESAR School.

## Executar

Requer Node.js 22 ou superior, sem dependências de instalação.

```powershell
cd D:\programacao\horas_cesar\horas-complementares
npm start
```

Abra http://127.0.0.1:4173. Execute `npm test` para verificar as regras de cálculo.

## Funcionamento

- Cadastro, edição, exclusão, busca e filtros de atividades.
- Simulação ao preencher; conversões por horas, meses, semestres e unidades; limite por categoria.
- Aprovadas têm prioridade sobre enviadas; enviadas têm prioridade sobre simuladas. Dentro de cada situação, a ordem de cadastro define a ocupação do limite. Uma edição preserva a posição original.
- O saldo para concluir as 90 horas considera apenas aprovadas. A previsão soma todos os estados e pode ultrapassar a meta, mas nunca o limite de cada categoria.
- Situação de aprovação declarada pelo aluno. Sem envio automático ou integração com a faculdade.
- Comprovantes PDF, PNG, JPG e WebP de até 5 MB. Dados e anexos em IndexedDB, apenas no navegador e na origem usada. Não há conta ou sincronização entre dispositivos. A versão local e a publicada têm armazenamentos separados. Limpar os dados do navegador apaga os registros.
- Backup e restauração em JSON, incluindo comprovantes. Restauração substitui os registros mediante confirmação. Guarde o arquivo com cuidado: pode conter dados pessoais.

## Premissas que precisam ser confirmadas no regulamento completo

Nas categorias sem conversão explícita, foi adotada a carga horária declarada/comprovada, sujeita à avaliação da faculdade. Períodos de 6 meses contabilizam somente blocos completos; eventual tratamento de períodos adicionais precisa ser confirmado. Concursos/competições aceitam uma estimativa de até 25 horas por participação. Outras atividades dependem de NDE/diretoria. Checklists são declarações do aluno, não análise automatizada de documentos.

Não há OCR, validação de autenticidade, detecção automática de certificados repetidos nem conferência automática das datas de início/fim do curso. Cada realização deve ser cadastrada uma única vez. A versão/data do manual e regras gerais fora das tabelas ainda precisam ser fornecidas. Mudanças em `dist/rules.js` afetam os cálculos de todos os registros existentes.

## Arquivos

`dist/rules.js`: regras e cálculo; `dist/app.js`: interface e armazenamento; `dist/styles.css`: layout responsivo; `tests/rules.test.js`: testes; `server.mjs`: servidor local restrito ao diretório dist.

Sem ferramentas de build. A pasta `dist` pode ser hospedada diretamente. A fonte Google Fonts é opcional; sem rede, o layout usa fontes locais.
