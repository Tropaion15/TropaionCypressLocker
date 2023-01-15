class CheckoutPage 
{
    getCostListOfAllItems(){
        return cy.get("tr > :nth-child(4) > strong")
    }
    getTotalCost(){
        return cy.get('h3 > strong')
    }
    getCheckoutButton(){
        return cy.get(".btn-success")
    }
}

export default CheckoutPage