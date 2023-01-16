class VegHomePage
{
    getPreviewBasket(){
        return cy.get('.cart-icon > img')
    }
    getProceedToCheckout(){
        return cy.get('.cart-preview > .action-block > button')
    }
    getHowManyItemsInCart(){
        return cy.get(':nth-child(1) > :nth-child(3) > strong')
    }
    
}

export default VegHomePage