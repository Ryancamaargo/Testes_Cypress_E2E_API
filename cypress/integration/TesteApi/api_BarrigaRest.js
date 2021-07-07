/// <reference types="cypress" />

const dayjs = require('dayjs')

describe('Teste de API', () => {
    Cypress.config('baseUrl', 'https://barrigarest.wcaquino.me')

    before(() => {
        cy.getToken('teste123123', '123')
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('POST Criar conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            body: {
                nome: 'Conta criada API'
            }
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta criada API')
        })
    })

    it('PUT Alterar conta', () => {
        cy.getContaByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    body: {
                        nome: 'Conta alterada via API'
                    }
                }).as('response')

            })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('POST Validação criar conta com mesmo nome', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('POST Criar transação', () => {
        cy.getContaByName('Conta transação')
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),//uso do dayjs é porque o moment foi descontinuado 
                        data_transacao: dayjs().format('06/07/2021'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('GET Validar saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            console.log(res.body[0])
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                body: {
                    status: true,
                    data_pagamento: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_transacao: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('DELETE Apagar transação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
            }).its('status').should('be.equal', 204)
        })
    })


})