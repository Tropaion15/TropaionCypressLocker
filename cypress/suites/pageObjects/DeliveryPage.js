class DeliveryPage 
{
    getCountryBox(){
        return cy.get('#country')
    }
    getCountrySuggestions(){
        return cy.get('.suggestions > ul > li > a')
    }
    getCheckbox(){
        return cy.get('#checkbox2')
    }
    getPurchaseButton(){
        return cy.get('.btn-success')
    }
    getConfirmationText(){
        return cy.get('strong')
    }
    
}

export default DeliveryPage