/// <reference types="cypress" />

const dayjs = require('dayjs')
 
describe('Testando API Heroku', () => {
    let booking_obj
    let booking_id
    let token
    before(() => {
       // baseUrl CONFIGURADA no arquivo cypress.json
        cy.request({
            url: '/auth',
            method: 'POST',
            body: {
                username: "admin",
                password: "password123"
            }
        }).as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property("token")
            expect(res.body.token).to.be.not.empty
            token = res.body.token
        })
    })

    it('POST Criar livro', () => {
        cy.request({
            method: 'POST',
            url: '/booking',
            body: {
                firstname: "Ryan",
                lastname: "Camargo",
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: dayjs().format('YYYY-MMM-DD'),
                    checkout: "2021-07-05"
                },
                additionalneeds: "Testes Automatic"
            }
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.bookingid').should('exist')
        cy.get('@response').its('body').then((obj) => {
            booking_obj = obj.booking
            booking_id = obj.bookingid
        })
    })

    it('GET Buscar todos livros', () => {
        cy.request({
            url: '/booking',
            method: 'GET',
        }).as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.to.be.a('number')
        })
    })

    it('GET Busca ID do livro', () => {
        cy.request({
            method: 'GET',
            url: `/booking/?firstname=${booking_obj.firstname}&lastname=${booking_obj.lastname}`,
        }).as('response')
        cy.get('@response').then((res) => {
            console.log(res)
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.to.be.a('number')
        })
    })

    it('GET Busca por Datas', () => {
        cy.request({
            method: 'GET',
            url: `/booking/?checkin=${booking_obj.bookingdates.checkin}&checkout=${booking_obj.bookingdates.checkout}`,
        }).as('response')
        cy.get('@response').then((res) => {
            console.log(res)
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.to.be.a('number')
        })
    })

    it('GET Busca por ID', () => {
        cy.request({
            method: 'GET',
            url: `/booking/${booking_id}`,
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.firstname').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.lastname').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.totalprice').should('exist').and('be.a', 'number')
        cy.get('@response').its('body.depositpaid').should('exist').and('be.a', 'boolean')
        cy.get('@response').its('body.bookingdates').should('exist').and('be.a', 'object')
        cy.get('@response').its('body.bookingdates.checkin').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.bookingdates.checkout').should('exist').and('be.a', 'string')
    })

    it('PUT Atualizar livro', () => {
        cy.request({
            method: 'PUT',
            url: `/booking/${booking_id}`,
            headers: { Cookie: `token= ${token}` },
            body: {
                firstname: "Ryan",
                lastname: "Camargo2",
                totalprice: 200,
                depositpaid: true,
                bookingdates: {
                    checkin: dayjs().format('YYYY-MMM-DD'),
                    checkout: "2021-07-09"
                },
                additionalneeds: "Testes com Cypress"
            }
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.lastname').should('be.equal', 'Camargo2')
        cy.get('@response').its('body.totalprice').should('eq', 200)
        cy.get('@response').its('body.bookingdates.checkout').should('eq', "2021-07-09")
    })

    it('DELETE livro', () => {
        cy.request({
            method: 'DELETE',
            url: `/booking/${booking_id}`,
            headers: { Cookie: `token= ${token}` },
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 201)
    })
})