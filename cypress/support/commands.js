// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//Primary use in the Test_PhoneShop.js
Cypress.Commands.add('getProductNameAndClickAdd', (product) => {
  cy.get(".card.h-100").each(($el, index, $list) => {
    const text=$el.text()
  
    if (text.includes(product)){
      const windex = index + 1
      cy.get(':nth-child('+windex+') > .card > .card-footer > .btn').click()
    }
  })
})
//Primary use in the Test_VeggieShopping.js
Cypress.Commands.add('getVegetableNameAndClickAdd', (product) => {
  cy.get(".product").each(($el, index, $list) => {
    const text=$el.text()
  
    if (text.includes(product)){
      const windex = index + 1
      cy.get(':nth-child('+windex+') > .product-action > button').click()
    }
  })
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })