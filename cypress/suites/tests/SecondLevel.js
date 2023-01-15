/// <reference types = "Cypress" />

describe("Suite mk2", function() {

    before(function () {
        cy.fixture('userData').then(function (data) {
          this.data = data
        })
      })

    it("Basic validation test", function() {

        cy.visit("https://rahulshettyacademy.com/angularpractice/")

        cy.get(':nth-child(1) > .form-control').type(this.data.name)

        cy.get(':nth-child(2) > .form-control').type(this.data.email)

        cy.get('#exampleInputPassword1').type(this.data.pwd)

        cy.get('#exampleCheck1').check()

        cy.get('#exampleFormControlSelect1').select(this.data.gender)

        cy.get('#inlineRadio2').check()

        cy.get('#inlineRadio3').should("be.disabled")

        cy.get(':nth-child(8) > .form-control').type("1983-11-06")

        cy.get(':nth-child(4) > .ng-untouched').should("have.value",this.data.name)

        cy.get('.btn').click()

        cy.get('.alert').then(function(element) {
            const actualText = element.text()
            expect(actualText.includes(this.data.sucessMsg)).to.be.true
        })
    })
})