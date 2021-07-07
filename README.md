Olá, nesse repositório se encontra testes com a ferramenta Cypress, contendo teste E2E e de API.

Apesar de não utilizar a ferramenta, decidi fazer um desafio comigo mesmo, e tentar fazer os exercicios proposto.


E2E -> Foi utilizado o seguinte site para teste https://seubarriga.wcaquino.me/
Nesse teste, usei a implementação de locators e command, para ajudar na visualização dos códigos e também da boa prática. Executei testes de login, cadastro de usuário, criar, alterar, e deletar as contas, criação de movimentação, e validações dos campos, retorno de alertas (erro ou sucesso). E para isso, utilizei alguns elementos do Cypress, como o cy.get, o should, o constains (para validar a existencia da mensagem de retorno), e o before e os it para criar cada caso de teste.


Teste de API -> Foram feitos 3 testes de api (https://barrigarest.wcaquino.me, https://restful-booker.herokuapp.com, e http://dummy.restapiexample.com/api/v1), validando as exceções de cada método (POST, PUT, GET E DELETE).
Além de fazer as Request, foi validado cada retorno e nas telas, como é o caso do BarrigaRest, onde foi validado a existencia de um saldo na conta. E foi validado o retorno do status da pagina se houve sucesso ou falha (200, 429, etc). Pegar o token, fazer a busca através do id com o get, fazer busca por data, alterar com o metodo put, validar os campos alterados, entre outros, excluir pegando o token do cookie. 


Acredito que com mais experiência, a utilização do Cypress venha a melhorar, afinal, comecei a mexer com ela essa semana passada. 

Mas como já tinha experiencia com JavaScript, onde fiz um projeto bacana (https://github.com/Ryancamaargo/HTMLTrabalhoFinalRyan) e experiencia com Selenium e Java (https://github.com/Ryancamaargo/TesteSeleniumWebDriveAndIde), ajudou um pouco a entender melhor o Cypress.
