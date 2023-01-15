class FormPage 
{
    getName(){
        return cy.get(':nth-child(1) > .form-control')
    }

    getEmail(){
        return cy.get(':nth-child(2) > .form-control')
    }

    getPwd(){
        return cy.get('#exampleInputPassword1')
    }

    getIceCream(){
        return cy.get('#exampleCheck1')
    }

    getGender(){
        return cy.get('#exampleFormControlSelect1')
    }

    getEmployed(){
        return cy.get('#inlineRadio2')
    }

    getEntrepreneur(){
        return cy.get('#inlineRadio3')
    }

    getDate(){
        return cy.get(':nth-child(8) > .form-control')
    }

    getTwoWayBinder(){
        return cy.get(':nth-child(4) > .ng-untouched')
    }

    getSubmitBtn(){
        return cy.get('.btn')
    }

    getConfirmationAlrt(){
        return cy.get('.alert')
    }
    getShopButton(){
        return cy.get(':nth-child(2) > .nav-link')
    }
}

export default FormPage