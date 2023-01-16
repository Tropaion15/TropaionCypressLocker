/// <reference types = "Cypress" />
import FormPage from "../pageObjects/FormPage"
import ShopPage from "../pageObjects/ShopPage"
import CheckoutPage from "../pageObjects/CheckoutPage"
import DeliveryPage from "../pageObjects/DeliveryPage"

describe("Test suite for the phone shop", function() {

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
 * This test adds some phones proceeds to checkout, compares their total cost to the pages own sum, then selects a country of delivery and confirms the success message
 */
  it("Add items, check total value, deliver to country", function() {
    
    //instance pageObject
    const formPage = new FormPage()
    const shopPage = new ShopPage() 
    const checkoutPage = new CheckoutPage()
    const deliveryPage = new DeliveryPage()
    
    //visit page
    cy.visit(this.web.angularpractice)  

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

    deliveryPage.getCountryBox().type(this.data.deliverySearchStr)
    cy.wait(5000)
    deliveryPage.getCountrySuggestions().click()
    deliveryPage.getCheckbox().click({ force: true })
    deliveryPage.getPurchaseButton().click()

    deliveryPage.getConfirmationText().then(function (element) {
      const actualText = element.text()
      expect(actualText.includes(this.data.sucessMsg)).to.be.true
    })
  })
})