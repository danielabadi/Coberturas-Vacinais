# Visualização das coberturas vacinais por meio de Sistemas de Informação Geográficos
Projeto Orientado em Computação II - 2023/01  
Aluno: Daniel Ferreira Abadi  
Orientador: Clodoveu A. Davis Jr.  
Universidade Federal de Minas Gerais - Instituto de Ciências Exatas - Departamento de Ciência da Computação  

## Motivação
  A vacinação é essencial no combate a doenças, mas a cobertura vacinal tem diminuído globalmente. No Brasil, o ressurgimento do sarampo em 2018 é um exemplo desse problema. Cerca de 25 milhões de crianças em todo o mundo não receberam as vacinas necessárias, incluindo difteria e coqueluche. A queda na cobertura vacinal é um desafio complexo, agravado pela pandemia de Covid-19. É importante monitorar constantemente a cobertura vacinal e tomar medidas adequadas. Este trabalho tem como objetivo desenvolver uma ferramenta interativa para monitorar a cobertura vacinal no Brasil, fornecendo informações abrangentes e auxiliando na formulação de políticas para fortalecer a vacinação.

<details>
  <summary>
    <h2>Como rodar o projeto localmente</h1>
  </summary>

### Pré-requisitos
Antes de começar, certifique-se de ter as seguintes tecnologias instaladas em sua máquina:
- Node.js na versão 18 ou superior
- PostgreSQL
- Extensão PostGIS
Caso tenha dificuldades com o banco de dados e a extensção veja mais neste vídeo: https://www.youtube.com/watch?v=k7NavydYDQE

### Criação do banco de dados
1. No diretório do projeto, navegue até a pasta "database".
2. Dentro dessa pasta, você encontrará os scripts necessários para criar a base de dados, o esquema e as tabelas, juntamente com suas restrições.
3. Dentro da pasta "data", você encontrará arquivos CSV contendo dados relevantes. Observe que os polígonos não estão incluídos nesses arquivos, pois você pode baixá-los na plataforma do IBGE. No entanto, esses dados não são obrigatórios, uma vez que o projeto utiliza a API de malhas geográficas do IBGE para recuperar os polígonos.

### Configuração da conexão do backend com o banco de dados
1. No diretório "src" do backend, abra o arquivo "db.js".
2. Neste arquivo, você encontrará as configurações de conexão com o banco de dados. Certifique-se de atualizar as informações de acordo com a configuração do seu ambiente.
```javascript
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '',
        user: '',
        password: '',
        database: 'vacinacao',
    },
    searchPath: ['geodata', 'public'],
});
```

### Executando o sistema
1. Primeiramente, abra o terminal.
2. Para a primeira execução, navegue até a pasta do backend no terminal e execute o comando `npm install`. Faça o mesmo na pasta do frontend.
3. Para iniciar o backend, navegue até a pasta do backend no terminal e execute o comando `npm run start`.
4. Em seguida, para iniciar o frontend, navegue até a pasta do frontend no terminal e execute o comando `npm run start`.

Certifique-se de que todos os passos tenham sido executados corretamente para garantir o funcionamento adequado do projeto.
  
  </details>
