/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Testes funcionais E2E', () => {
    before(() => {
        cy.login('teste0.8625113695769429@teste.com', '123')
    })

    beforeEach(() => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_HOME).click()//home
    })

    it('Criar conta com sucesso', () => {
        cy.get().click()
        cy.get(loc.CONTAS_BUTTONS.OPCAO_ADDCONTA).click()
        cy.get(loc.CONTAS.NOME).should('exist').type('Conta nova')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('exist').contains('Conta adicionada com sucesso')
    })

    it('Alterar nome da conta criada', () => {
        cy.get(loc.CONTAS_BUTTONS.ABRIROPCAO).click()
        cy.get('.dropdown-menu > li:nth-child(2) > a').click()
        cy.get('tr:nth-child(1) .glyphicon-edit').click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Conta alterada com sucesso')
    })

    it('Validar uma conta já existente', () => {
        cy.get(loc.CONTAS_BUTTONS.ABRIROPCAO).click()
        cy.get(loc.CONTAS_BUTTONS.OPCAO_ADDCONTA).click()
        cy.get(loc.CONTAS.NOME).should('exist').type('Conta existente')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('exist').contains('Já existe uma conta com esse nome')
    })

    it('Exclusao de conta criada', () => {
        cy.get(loc.CONTAS_BUTTONS.ABRIROPCAO).click()
        cy.get().click()
        cy.get('[href="/removerConta?id=669874"] > .glyphicon').click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Conta em uso na movimentações')
    })

    it('Validar a movimentação sem dados (validar se há o erro)', () => {
        cy.get('[href="/movimentacao"]').click()
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'obrigatório')
    })

    it.only('Criar movimentação pendente', () => {
        cy.get('[href="/movimentacao"]').click()
        cy.get(loc.CONTAS_BUTTONS.ABRIROPCAO).click()
        cy.get('#data_transacao').type('04/07/2021')
        cy.get('#data_pagamento').type('04/07/2021')
        cy.get('#descricao').type('Receita 1')
        cy.get('#interessado').type('interessado')
        cy.get('#valor').type('100')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Movimentação adicionada com sucesso')
    })

    it('Excluir movimentação', () => {
        cy.get('[href="/extrato"]').click()
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get('[href="/removerMovimentacao?id=620805"] > .glyphicon').click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Movimentação removida com sucesso')
    })

    it('Criar movimentação Receita paga', () => {
        cy.get('[href="/movimentacao"]').click()
        cy.get('#data_transacao').type('04/07/2021')
        cy.get('#data_pagamento').type('04/07/2021')
        cy.get('#descricao').type('Receita 1')
        cy.get('#interessado').type('interessado')
        cy.get('#valor').type('100')
        cy.get('#status_pago').check()
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Movimentação adicionada com sucesso')
        cy.get('[href="/extrato"]').click()
    })

    it('Criar movimentação Debito paga', () => {
        cy.get('[href="/movimentacao"]').click()
        cy.get('#tipo').select('Despesa')
        cy.get('#data_transacao').type('04/07/2021')
        cy.get('#data_pagamento').type('04/07/2021')
        cy.get('#descricao').type('Receita 1')
        cy.get('#interessado').type('interessado')
        cy.get('#valor').type('100')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Movimentação adicionada com sucesso')
    })

    it('Verificar saldo correto', () => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_HOME).click()
        cy.get('#tabelaSaldo').should('contain', '100')
    })

    it('Validar conta para nao excluir conta com movimentação', () => {
        cy.get(loc.CONTAS_BUTTONS.ABRIROPCAO).click()
        cy.get('[href="/contas"]').click()
        cy.get('[href="/removerConta?id=669874"] > .glyphicon').click()
        cy.get(loc.ALERTA_MENSAGEM).should('contain', 'Conta em uso na movimentações')
    })

    it('Sair', () => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_SAIR).click()
        cy.get(loc.LOGIN.EMAIL).should('exist')
    })

    it('Validação de cadastro de Usuario incorreto', () => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_SAIR).click()
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_CADASTRO).click()
        cy.get(loc.CADASTRO.EMAIL_CADASTRO).should('exist')
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('exist').contains('Nome')//validação se está mostrando alguma mensagem...
    })

    let aleatorio = Math.random(40000);
  //  console.log(aleatorio)
    it('Validação de cadastro de Usuario certo', () => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_CADASTRO).click()
        cy.get(loc.CADASTRO.EMAIL_CADASTRO).type("teste" + aleatorio + "@teste.com")
        cy.get(loc.CADASTRO.NOME_CADASTRO).type("Teste Joãozinho")
        cy.get(loc.CADASTRO.SENHA_CADASTRO).type("123")
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('exist').contains('inserido')//mensagem retornada para o cliente.
    })


    it('Validação de login incorreto', () => {
        cy.get(loc.LINKTEXT_BUTTONS.LINKTEXT_LOGIN).click()
        cy.get(loc.LOGIN.EMAIL).type("teste@teste.com")
        cy.get(loc.LOGIN.SENHA).type("123")
        cy.get(loc.BTN_TODASTELAS).click()
        cy.get(loc.ALERTA_MENSAGEM).should('exist').contains('Problemas com o login do usuário')//validando se há algum retorno para o usuário...
    })
})