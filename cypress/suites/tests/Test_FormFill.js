/// <reference types = "Cypress" />
import FormPage from "../pageObjects/FormPage"

describe("Test suite for the data form", function() {

  //pre test hook for dynamic datatable
  this.beforeEach(function () {
    cy.fixture('userData').then(function (data) {
      this.data = data
    })
    cy.fixture('webPages').then(function (web) {
      this.web = web
    })
  })

/***
 * This test does a happy flow of the form and does some basic functionality tests of submitting, data binding and disabled options
 */
  it("Form fill and basic validation", function() {
    
    //instance pageObject
    const formPage = new FormPage() 

    //visit page
    cy.visit(this.web.angularpractice)  

    //data fill and validation
    formPage.getName().type(this.data.name)

    formPage.getEmail().type(this.data.email)

    formPage.getPwd().type(this.data.pwd)

    formPage.getIceCream().check()

    formPage.getGender().select(this.data.gender)

    formPage.getEmployed().check()

    formPage.getEntrepreneur().should("be.disabled")

    formPage.getDate().type(this.data.dateOfBirth)

    formPage.getTwoWayBinder().should("have.value",this.data.name)

    //submit and 
    formPage.getSubmitBtn().click()

    //check message
    formPage.getConfirmationAlrt().then(function(element) {
      const actualText = element.text()
      expect(actualText.includes(this.data.sucessMsg)).to.be.true
    })
  })
})