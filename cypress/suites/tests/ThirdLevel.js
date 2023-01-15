/// <reference types = "Cypress" />
import FormPage from "../pageObjects/FormPage"
import ShopPage from "../pageObjects/ShopPage"
import CheckoutPage from "../pageObjects/CheckoutPage"
import DeliveryPage from "../pageObjects/DeliveryPage"

describe("Suite mk3", function() {

  //pre test hook for dynamic datatable
  this.beforeEach(function () {
    cy.fixture('userData').then(function (data) {
      this.data = data
    })
  })

  it("Data fill for a form", function() {
    
    //instance pageObject
    const formPage = new FormPage() 

    //visit page
    cy.visit("https://rahulshettyacademy.com/angularpractice/")  

    //data fill and validation
    formPage.getName().type(this.data.name)

    formPage.getEmail().type(this.data.email)

    formPage.getPwd().type(this.data.pwd)

    formPage.getIceCream().check()

    formPage.getGender().select(this.data.gender)

    formPage.getEmployed().check()

    formPage.getEntrepreneur().should("be.disabled")

    formPage.getDate().type("1983-11-06")

    formPage.getTwoWayBinder().should("have.value",this.data.name)

    //submit and 
    formPage.getSubmitBtn().click()

    //check message
    formPage.getConfirmationAlrt().then(function(element) {
      const actualText = element.text()
      expect(actualText.includes(this.data.sucessMsg)).to.be.true
    })
  })

  it("Shop, compare, checkout, deliver", function() {
    
    //instance pageObject
    const formPage = new FormPage()
    const shopPage = new ShopPage() 
    const checkoutPage = new CheckoutPage()
    const deliveryPage = new DeliveryPage()
    
    //visit page
    cy.visit("https://rahulshettyacademy.com/angularpractice/")  

    //navigate to shop
    formPage.getShopButton().click()

    //add products from userData using custom command
    for (let i=0; i < this.data.phones.length; i++) {
      cy.getProductNameAndClickAdd(this.data.phones[i])
    }

    //navigate to checkout
    shopPage.getCheckoutBtn().click()

    //getting and trimming combined cost of basket
    var sum = 0
    checkoutPage.getCostListOfAllItems().each(($el, index, $list) => {
      const amount = $el.text()
      var res = amount.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)
    })

    //getting and trimming total cost
    var tot = 0
    checkoutPage.getTotalCost().then(function (element) {
      const total = element.text()
      var trimmedTotal = total.split(" ")
      trimmedTotal = trimmedTotal[1].trim()
      tot = Number(trimmedTotal)
      //comparing to the total i counted
      expect(tot).to.equal(sum)
    })

    //navigate to delivery page
    checkoutPage.getCheckoutButton().click()

    deliveryPage.getCountryBox().type("Swe")
    cy.wait(5000)
    deliveryPage.getCountrySuggestions().click()
    deliveryPage.getCheckbox().click({ force: true })
    deliveryPage.getPurchaseButton().click()

    deliveryPage.getConfirmationText().then(function (element) {
      const actualText = element.text()
      expect(actualText.includes("Success")).to.be.true
    })

  })
})