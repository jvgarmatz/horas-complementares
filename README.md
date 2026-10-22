# Horas — Atividades Complementares

Organize seus certificados, simule o aproveitamento das atividades e acompanhe quanto falta para completar as horas complementares do seu curso.

O **Horas** é um projeto acadêmico independente voltado aos estudantes da **CESAR School**. Funciona na própria máquina do aluno, com os dados salvos no navegador.

> **Uso acadêmico e não comercial**
>
> Este projeto destina-se exclusivamente a fins educacionais, sem finalidade comercial. Não constitui uma plataforma oficial da CESAR School e não substitui o regulamento vigente nem a análise e a validação das atividades pela coordenação.

## Funcionalidades

- **Perfil do aluno:** nome e seleção do curso, com meta de horas preenchida automaticamente.
- **Painel de progresso:** horas aprovadas, enviadas, simuladas e saldo restante.
- **Passo a passo na página inicial:** simular, revisar atividades, abrir a solicitação no Lyceum e atualizar o status das atividades para Aprovada após a confirmação da faculdade. A solicitação e a consulta oficial são feitas pelo aluno no Lyceum, fora do Horas. O passo 4 abre Minhas atividades sem filtros para localizar e editar os registros simulados ou enviados.
- **Simulador:** previsão de aproveitamento com conversões e limites por categoria.
- **24 categorias:** consulta às regras, à comprovação exigida e aos requisitos.
- **Gestão de atividades:** cadastro, edição, exclusão, busca e filtros.
- **Comprovantes:** anexos PDF, PNG, JPG ou WebP de até 5 MB por arquivo.
- **Backup:** exportação e importação de perfil, atividades e comprovantes em JSON.
- **Interface responsiva:** layout que se adapta ao tamanho da tela.

## Começar a usar

### Requisitos

- Node.js 22 ou superior, com npm disponível.
- Navegador atualizado com suporte a IndexedDB.
- Git, caso prefira clonar o repositório.

Não é necessário instalar dependências com `npm install` nem executar uma etapa de build.

### Opção 1 — Clonar o repositório

Abra um terminal e execute:

```sh
git clone https://github.com/jvgarmatz/horas-complementares.git
cd horas-complementares
npm start
```

### Opção 2 — Baixar o ZIP

1. Na página do repositório, clique em **Code → Download ZIP**.
2. Extraia o arquivo.
3. Abra um terminal na pasta que contém `package.json`.
4. Execute:

```sh
npm start
```

### Abrir a aplicação

Acesse **http://127.0.0.1:4173** no navegador.

O servidor aceita conexões apenas da própria máquina. Mantenha o terminal aberto durante o uso e pressione `Ctrl+C` para encerrá-lo. Depois de obter o código e instalar o Node.js, a aplicação funciona sem conexão com a internet; o acesso ao manual exige conexão.

Não abra `dist/index.html` diretamente: utilize `npm start`, pois a aplicação carrega módulos JavaScript.

## Primeiro acesso

1. Informe seu nome e selecione seu curso. A carga horária exigida será preenchida automaticamente.
2. Consulte **Categorias e regras** para conferir o enquadramento da atividade.
3. Adicione uma atividade, informe os dados e anexe o comprovante, se disponível.
4. Confira a estimativa, os requisitos e a situação cadastrada.
5. Acompanhe seu progresso na **Visão geral**.

A meta é definida pelo curso selecionado e não pode ser digitada manualmente. Para trocar de curso, acesse **Meu perfil**. As atividades existentes são preservadas e o saldo é recalculado.

| Modalidade | Curso | Horas exigidas |
| --- | --- | ---: |
| Bacharelado | Ciência da Computação | 120 h |
| Bacharelado | Sistemas de Informação | 120 h |
| Bacharelado | Design | 120 h |
| Bacharelado | ADM Tech | 120 h |
| Tecnológico | Análise e Desenvolvimento de Sistemas (ADS) | 90 h |
| Tecnológico | Segurança da Informação (Cibersegurança) | 90 h |
| Tecnológico | Bancos de Dados e IA | 90 h |
| Tecnológico | Gestão da Tecnologia da Informação (GTI) | 90 h |

Perfis antigos continuam funcionando com os dados existentes. Ao editar um perfil antigo, o sistema tenta reconhecer o curso pelo nome ou sigla; ao salvar, aplica a meta da lista. Cursos não reconhecidos exigem uma seleção. Essa atualização não apaga atividades nem comprovantes.

## Regras de aproveitamento

**Referência utilizada — 2026.2:** [Manual do Estudante — páginas 34 e 35](https://drive.google.com/file/d/1fpUxnOsYP123YRaCTnLq7jALZRvU9zox/view?usp=drive_link/).

As 24 categorias foram transcritas das tabelas do manual fornecido para este projeto. Antes de apresentar suas atividades, confirme se essas regras se aplicam ao seu curso e se continuam vigentes.

**Trocar de curso ajusta a meta, mas não modifica as categorias, as conversões ou os limites do regulamento.** Atualmente, a aplicação contém apenas esse conjunto de regras da CESAR School.

### Situações das atividades

| Situação | Significado |
| --- | --- |
| Simulada | Atividade registrada para planejamento, ainda não apresentada |
| Enviada | Atividade que o aluno informa ter apresentado à faculdade, aguardando avaliação |
| Aprovada | Atividade cuja aprovação pela faculdade foi informada pelo aluno |

O sistema não envia documentos à faculdade nem consulta aprovações oficiais.

### Cálculo das horas

- Cada atividade segue a conversão e o limite da sua categoria.
- Ao atingir o limite da categoria, considerando atividades aprovadas, enviadas e simuladas, o cadastro de novas atividades e certificados nessa categoria é bloqueado. Os registros existentes podem ser editados para corrigir dados ou atualizar a aprovação. Não é permitido transferir uma atividade de outra categoria para uma categoria já completa. Reduzir ou excluir registros pode liberar saldo novamente.
- As aprovadas ocupam o limite primeiro, seguidas das enviadas e das simuladas.
- Dentro de cada situação, a ordem de cadastro define a ocupação do limite. Editar uma atividade preserva sua posição.
- O saldo para concluir a meta considera apenas as horas aprovadas.
- A previsão inclui as três situações. Pode ultrapassar a meta pessoal, respeitando os limites das categorias.

**Exemplo:** um workshop CESAR de 8 horas gera 4 horas complementares. Se a categoria já tiver 18 das 20 horas permitidas ocupadas por atividades com prioridade, apenas 2 horas adicionais poderão ser aproveitadas.

Nas categorias sem conversão explícita, a simulação utiliza as horas declaradas/comprovadas. Períodos mínimos de seis meses contabilizam apenas blocos completos. Atividades sujeitas à avaliação específica continuam dependendo da decisão da faculdade.

## Seus dados e comprovantes

Os registros ficam em **IndexedDB**, no navegador e no endereço utilizado para abrir a aplicação. Não há conta de aluno, banco de dados remoto ou sincronização entre dispositivos. Pessoas que usam o mesmo perfil de navegador e endereço compartilham os registros.

**Limpar os dados do navegador pode apagar suas atividades e comprovantes.** Trocar de navegador, dispositivo ou endereço não transfere os dados automaticamente.

### Fazer backup ou transferir os dados

1. Clique em **Salvar uma cópia dos meus dados** para salvar um arquivo JSON com seu perfil, atividades e anexos.
2. Guarde esse arquivo em um local seguro: ele pode conter dados pessoais e certificados.
3. Para recuperar os dados em outro navegador ou computador, utilize **Recuperar meus dados de uma cópia**.

A importação substitui os registros atuais mediante confirmação. Os backups atuais incluem o perfil e a meta. Backups da primeira versão também são aceitos: preservam o perfil atual ou permitem configurá-lo depois da restauração.

Se utilizou a antiga versão hospedada, exporte o backup naquele endereço e importe na aplicação local.

Não adicione backups ou comprovantes ao repositório. O `.gitignore` exclui os arquivos com o nome padrão `horas-backup-*.json`.

### Apagar os dados e recomeçar

Em **Meu perfil**, clique em **Apagar meus dados e recomeçar**. A confirmação informa quantos registros serão removidos e permite exportar um backup antes. Digite **APAGAR** e clique em **Apagar definitivamente** para confirmar.

Isso remove o perfil, todas as atividades e seus comprovantes do armazenamento desta aplicação no navegador e retorna à configuração inicial. A exclusão só pode ser revertida pela importação de um backup. Arquivos de backup já baixados no computador não são apagados. Cancelar ou fechar a confirmação mantém os dados existentes.

## Limitações

- O aproveitamento apresentado é uma estimativa, sujeito à validação da faculdade.
- Não há leitura automática de certificados, validação de autenticidade ou identificação automática de documentos repetidos.
- Cada atividade deve ser registrada uma única vez.
- Os requisitos marcados são declarações do aluno; o sistema não verifica o conteúdo dos documentos.
- Não há conferência automática das datas de início e término do curso.
- Regras gerais fora das tabelas e eventuais atualizações do manual precisam ser conferidas com a instituição.

## Tecnologias e estrutura

HTML, CSS e JavaScript com módulos nativos, IndexedDB para armazenamento e Node.js para o servidor HTTP local e os testes. Sem frameworks ou dependências externas de execução.

```text
horas-complementares/
├── dist/
│   ├── index.html       # Estrutura da página
│   ├── styles.css       # Layout e estilos responsivos
│   ├── app.js           # Interface e armazenamento local
│   ├── storage.js       # Exclusão transacional dos dados locais
│   ├── rules.js         # Categorias, conversões e limites
│   └── profile.js       # Perfil, progresso e backups
├── tests/              # Testes das regras, metas e backups
├── server.mjs          # Servidor local em 127.0.0.1:4173
├── package.json        # Comandos de execução e testes
└── README.md
```

Alterações em `dist/rules.js` afetam o cálculo dos registros existentes. O layout utiliza fontes locais, sem carregar recursos externos automaticamente.

## Executar os testes

Na pasta do projeto, execute:

```sh
npm test
```

Os testes cobrem conversões, limites por categoria, prioridade das situações, metas por curso, compatibilidade de perfis antigos, validação de registros e compatibilidade dos backups.

## Contribuir e compartilhar

Para relatar um problema, abra uma issue com os passos para reproduzi-lo e o comportamento esperado. Evite anexar certificados ou dados pessoais; utilize exemplos fictícios.

O código pode ser compartilhado pelo GitHub para que outros alunos o executem em suas próprias máquinas. **O projeto é destinado ao uso local; não deve ser publicado no ChatGPT Sites ou em outra hospedagem sem solicitação explícita do responsável pelo projeto.**
