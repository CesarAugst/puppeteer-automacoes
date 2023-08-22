# puppeteer-automacoes
Estarei usando esse repositório para realizar pequenas automações de mídias sociais (inicialmente visnado whatsapp/linkedin) mas que serão expandidas para demais funcionalidades (viso também automatizar consultas no site Status Invest)

## Como executar o projeto
- Utilize o comando ```npm install``` para baixar as dependencias
- na raiz do projeto, copie o arquivo ```/env-example.js``` e renomeie para ```env.js``` e popule seus parâmetros conforme sua necessidade

## Serviços disponibilizados
- ```/linkedin/batch/url```
  - Propósito: a partir de uma lista de urls, devolver o link de perfil de cada uma
  - método da requisição: Post
  - parâmetro esperado: (array de string) url_list

## Bibliotecas Utilizadas
- Express
  - Comando para instalação: ```npm install express```
  - [Documentação](https://www.npmjs.com/package/express)
  - Propósito: Tornar a aplicação acessível por meio de requisições HTTP rest
  - Dicas de material para consultar:
    - [Curso de Node.js - Rotas #07](https://www.youtube.com/watch?v=UMI7kFwmAHo)
    - [Curso de Node.js - Parâmetros #08](https://www.youtube.com/watch?v=G9b-Zi0rg3o)
    - [Curso de Node.js - Grupo de rotas no Express.js #32](https://www.youtube.com/watch?v=ROL4ylHN47g)
    - [#01 Routes | Controllers | Express | NodeJS - Separando Routes e Controllers na API Rest Express](https://www.youtube.com/watch?v=vNo3iyfAhMA&t=93s)
- Puppeteer
  - Comando para instalação: ```npm install puppeteer```
  - [Documentação](https://www.npmjs.com/package/puppeteer)
  - Propósito: Fazer automações a nível de web scrapping
  - Dicas de material para consultar:
    - [Como criar um robô que faz login e da like? | Robô com JavaScript, NodeJS e Puppeteer](https://www.youtube.com/watch?v=Ltdp9-ZTAzM)
- Puppeteer Cluester
  - Comando para instalação: ```npm install puppeteer-cluster```
  - [Documentação](https://www.npmjs.com/package/puppeteer-cluster)
  - Dicas de material para consultar:
    - [Scale your application with Puppeteer-Cluster (NodeJS Tutorial)](https://www.youtube.com/watch?v=NcPJD2ofYG8)
- Nodemon
  - Comando para instalação: ```npm install -g nodemon```
  - [Documentação](https://www.npmjs.com/package/nodemon)
  - Propósito: Automatizar a execução do projeto enquanto estiver em desenvolvimento
  - Dicas de material para consultar:
    - [Curso de Node.js - Nodemon #09](https://www.youtube.com/watch?v=u3MrPxq_RyA)