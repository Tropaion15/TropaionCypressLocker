class VegCheckoutPage
{
    getAllProductTotalsInBasket(){
        return cy.get(':nth-child(5) > .amount')
    }
    getPlaceOrder(){
        return cy.get(':nth-child(14)')
    }
}

export default VegCheckoutPage