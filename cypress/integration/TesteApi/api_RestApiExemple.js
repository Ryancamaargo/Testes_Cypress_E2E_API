/// <reference types="cypress" />

describe('Testando API restapiexemple', () => {

    Cypress.config('baseUrl', 'http://dummy.restapiexample.com/api/v1')

    it('Metodo GET (PESQUISA)', () => {
        cy.request('/employees').then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body.data).to.have.length(24)
        })
    })

    it('Metodo POST (CRIAR)', () => {
        const item = { "name": "Ryan", "salary": "1000", "age": "19" }
        cy.request('POST', '/create', item)
            .its('body')
            .its('data')
            .should('include', { name: 'Ryan' })
    })

    it('Metodo PUT (ALTERAR)', () => {
        const item = { "name": "Ryan" }
        cy.request({ method: 'PUT', url: '/update/1', body: item }).its('status').should('eq', 200)
    })

    it('Metodo DELETE (EXCLUIR)', () => {
        const item = { "name": "Ryan2" }
        cy.request({ method: 'DELETE', url: '/delete/1', body: item, failOnStatusCode: false }).its('status').should('eq', 429)
    })
})