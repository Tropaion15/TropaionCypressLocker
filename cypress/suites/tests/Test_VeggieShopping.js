/// <reference types = "Cypress" />
import VegHomePage from "../pageObjects/VegHomePage"
import VegCheckoutPage from "../pageObjects/VegCheckoutPage"
import VegDeliveryPage from "../pageObjects/VegDeliveryPage"

describe("Test suite for the vegetable store", function() {

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
   * This test adds a bunch of pre determined vegetables to a basket, proceeds to checkout, does some basic validation of the checkout then finally places the order and verifies it
   */
  it("Add food items", function() {
    
    //instance pageObject
    const vegHomePage = new VegHomePage()
    const vegCheckoutPage = new VegCheckoutPage()
    const vegDeliveryPage = new VegDeliveryPage()
    
    //visit page
    cy.visit(this.web.seleniumpractice)
    
    cy.wait(500)
    //add some vegetables from userData using custom command
    for (let i=0; i < this.data.vegetables.length; i++) {
      cy.getVegetableNameAndClickAdd(this.data.vegetables[i])
    }

    //open basket and proceed to checkout
    vegHomePage.getPreviewBasket().click()
    vegHomePage.getProceedToCheckout().click()

    //compare length of basket to the dynamic data files shopping list
    vegCheckoutPage.getAllProductTotalsInBasket().its('length').then((len) => {
      assert.equal(len, this.data.vegetables.length)
    })

    //proceed to delivery and chose a country
    vegCheckoutPage.getPlaceOrder().click()
    vegDeliveryPage.getCountryBox().select(this.data.deliveryCountry)

    //check the terms and service and place order
    vegDeliveryPage.getAgreeCheckbox().check()
    vegDeliveryPage.getProceedToOrder().click()

    //wait for the confirmation to clear
    cy.wait(5000)

    //check that the basket is empty, indicating that the purchase has been completed
    vegHomePage.getHowManyItemsInCart().then(function(element) {
      const text = element.text()
      assert.equal(Number(text), 0)
    })
  })
})