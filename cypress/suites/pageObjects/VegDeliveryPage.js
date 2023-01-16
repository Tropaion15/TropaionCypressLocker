class VegDeliveryPage
{
    getCountryBox(){
        return cy.get('.wrapperTwo > div > ')
    }
    getAgreeCheckbox(){
        return cy.get('.chkAgree')
    }
    getProceedToOrder(){
        return cy.get('button')
    }
}

export default VegDeliveryPage