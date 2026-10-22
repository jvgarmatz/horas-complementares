# Horas — atividades complementares

Organizador de atividades complementares com perfil local, simulador de aproveitamento e acompanhamento de progresso. No primeiro acesso, cada aluno informa seu nome, curso e a carga horária exigida. A meta pode ser alterada em **Meu perfil**.

As 24 categorias seguem as tabelas do manual da CESAR School fornecidas para este projeto. **Mudar o curso ou a meta não muda as regras de aproveitamento.** Quem utilizar o sistema deve confirmar se esse regulamento se aplica ao seu curso. Este projeto não é um sistema oficial da instituição.

Projeto acadêmico independente destinado a apoiar estudantes da CESAR School, exclusivamente para fins educacionais e sem finalidade comercial. O sistema não substitui o regulamento vigente nem a análise e a validação das atividades pela coordenação. Esse aviso também aparece no painel em uma seção azul própria, logo abaixo do bloco laranja de progresso.

## Executar no seu computador

Requer Node.js 22 ou superior. Não há dependências para instalar.

Após baixar ou clonar o repositório, entre na pasta que contém `package.json` e execute:

```sh
npm start
```

Abra **http://127.0.0.1:4173**. O servidor aceita conexões apenas da própria máquina (`127.0.0.1`). Não é necessário publicar o site nem ter conexão com a internet para utilizar a aplicação. Mantenha o terminal aberto enquanto utiliza o servidor e use `Ctrl+C` para encerrá-lo. Para executar os testes:

```sh
npm test
```

Use o servidor HTTP, em vez de abrir `index.html` diretamente, pois a aplicação utiliza módulos JavaScript.

## Como usar

1. No primeiro acesso, preencha nome do aluno, curso e horas complementares exigidas. O valor inicial sugerido é 90 h, mas você pode informar uma meta maior ou menor.
2. Consulte **Categorias e regras** para conferir enquadramento, conversão, limite e comprovação.
3. Cadastre ou simule suas atividades. É possível anexar comprovantes e marcar os requisitos já conferidos.
4. Informe a situação: simulada, enviada ou aprovada pela faculdade. A aprovação é declarada pelo aluno; não existe integração com a instituição.
5. Consulte o saldo no painel. Para alterar o nome, o curso ou a meta, abra **Meu perfil**. As atividades existentes são mantidas.
6. Exporte um backup regularmente. Ele inclui perfil, meta, atividades e comprovantes.

## Como as horas são calculadas

- São aplicadas as conversões e os limites de cada categoria, independentemente da meta pessoal.
- Aprovadas têm prioridade sobre enviadas; enviadas têm prioridade sobre simuladas. Dentro de cada situação, a ordem de cadastro define a ocupação do limite. Uma edição preserva a posição original.
- O saldo para concluir a meta considera apenas aprovadas. A previsão soma todos os estados e pode ultrapassar a meta, mas nunca o limite de cada categoria.
- Exemplo: com 50 h aprovadas, uma meta de 120 h deixa saldo de 70 h. Alterá-la para 40 h deixa saldo zero, sem apagar nem reduzir as horas cadastradas.
- Mudar o nome do curso não seleciona automaticamente outro regulamento. Atualmente existe apenas o conjunto de regras da CESAR School incluído no projeto.

## Armazenamento e backup

Perfil, atividades e anexos ficam em IndexedDB, no navegador e no endereço em que o sistema foi aberto. Não há cadastro em servidor, autenticação por aluno ou sincronização entre dispositivos. Cada combinação de navegador/perfil do navegador e endereço tem seu próprio espaço. Pessoas que usam o mesmo perfil de navegador e endereço compartilham os registros.

Limpar os dados do site pode apagar os registros. Trocar de navegador, dispositivo ou endereço não transfere os dados. Use **Exportar backup** e **Importar backup** para transportá-los. Se você utilizou a versão anteriormente hospedada, exporte o backup nesse endereço e importe na aplicação local. O arquivo pode conter dados pessoais e comprovantes.

- Anexos: PDF, PNG, JPG ou WebP, até 5 MB por arquivo.
- Backups novos usam formato 2 e incluem perfil e identificação do conjunto de regras.
- Backups da primeira versão continuam sendo aceitos. Como não tinham perfil, preservam o perfil e a meta atuais. Se importados antes da configuração inicial, as atividades são restauradas e o aluno preenche o perfil em seguida.
- A restauração substitui os registros atuais mediante confirmação. No formato 2, o perfil também é substituído pelo do backup.
- A atualização a partir da versão inicial preserva o banco de dados existente. Alunos que já tinham atividades precisam apenas completar o perfil.

## Compartilhar o código para uso local

A aplicação é estática: `dist/` contém todos os arquivos necessários. O código pode ser disponibilizado em um repositório no GitHub para que cada aluno baixe ou clone o projeto e execute `npm start` na própria máquina. Não há etapa de build. Cada aluno configura seu perfil no navegador local.

Por decisão do projeto, o uso é exclusivamente local. A configuração de hospedagem foi removida e não devem ser feitas novas publicações no ChatGPT Sites ou em outros serviços sem solicitação explícita do responsável pelo projeto. Disponibilizar o código no GitHub não significa hospedar a aplicação.

Os arquivos de backup não fazem parte do código. O `.gitignore` exclui os backups com o nome padrão e os pacotes de publicação. Não inclua comprovantes ou registros pessoais no repositório.

## Premissas do regulamento

Nas categorias sem conversão explícita, foi adotada a carga horária declarada/comprovada, sujeita à avaliação da faculdade. Períodos de 6 meses contabilizam somente blocos completos; eventual tratamento de períodos adicionais precisa ser confirmado. Concursos/competições aceitam uma estimativa de até 25 horas por participação. Outras atividades dependem de NDE/diretoria. Checklists são declarações do aluno, não análise automatizada de documentos.

Não há OCR, validação de autenticidade, detecção automática de certificados repetidos nem conferência automática das datas de início/fim do curso. Cada realização deve ser cadastrada uma única vez. A versão/data do manual e regras gerais fora das tabelas ainda precisam ser confirmadas. Mudanças em `dist/rules.js` afetam os cálculos de todos os registros existentes.

## Organização do código

| Arquivo | Responsabilidade |
| --- | --- |
| `dist/rules.js` | Categorias, conversões, limites e validação de atividades |
| `dist/profile.js` | Perfil, meta personalizada, progresso e compatibilidade de backups |
| `dist/app.js` | Interface e persistência local |
| `dist/styles.css` | Layout responsivo |
| `tests/` | Testes de regras, perfis, metas e backups |
| `server.mjs` | Servidor local restrito a `dist/` |

O layout utiliza fontes disponíveis na máquina, sem carregar fontes ou outros recursos externos.
