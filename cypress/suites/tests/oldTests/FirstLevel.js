/// <reference types = "Cypress" />

describe("Suite mk1", function() {

    it("Basic validation test", function() {

        cy.visit("https://rahulshettyacademy.com/angularpractice/")

        const name = "Lukas"
        const email = "lukas.mathiasson93@gmail.com"
        const pwd = "12345678"
        const gender = "Female"

        cy.get(':nth-child(1) > .form-control').type(name)

        cy.get(':nth-child(2) > .form-control').type(email)

        cy.get('#exampleInputPassword1').type(pwd)

        cy.get('#exampleCheck1').check()

        cy.get('#exampleFormControlSelect1').select(gender)

        cy.get('#inlineRadio2').check()

        cy.get('#inlineRadio3').should("be.disabled")

        cy.get(':nth-child(8) > .form-control').type("1983-11-06")

        cy.get(':nth-child(4) > .ng-untouched').should("have.value",name)

        cy.get('.btn').click()

        cy.get('.alert').then(function(element) {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
})