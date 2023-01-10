/// <reference types = "Cypress" />

describe("Myfirst test suite", function() {

    it("My first test case", function() {

        //test step
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        cy.get(':nth-child(1) > .form-control').type("Lukas")
    })
})