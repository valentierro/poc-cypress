import ProjectHelper from "../../ProjectHelper";
import { BOOKS_FIXTURE_NAME } from "../books/BooksConstants";
import { INVALID_CREDENTIALS_MESSAGE } from "./LoginConstants";
import LoginObjects from "./LoginObjects";
import { faker } from '@faker-js/faker';


let randomUsername = ''

const projectHelper = new ProjectHelper()
class LoginActions extends LoginObjects {

    fillCredentials(validOrInvalidPassword: string) {
        if (validOrInvalidPassword.toUpperCase() == 'INVALID') {
            let randomUsername = faker.person.firstName()
            let randomPassword = projectHelper.generateRandomString(8) + '@'
            cy.get(this.inputUsername()).type(randomUsername)
            cy.get(this.inputPassword()).type(randomPassword)
        } else {
            cy.fixture('validUsers').then(user => {
                cy.get(this.inputUsername()).type(user.username)
                cy.get(this.inputPassword()).type(user.password)
            })
        }

    }

    clickOnButton(buttonName: string) {
        switch (buttonName.toUpperCase()) {
            case 'LOGIN':
                cy.get(this.btnLogin()).click()
                break
            case 'LOGOUT':
                cy.get(this.btnLogout()).click()
                break
            case 'REGISTER':
                cy.get(this.btnRegister()).click()
                break
            case 'NEW USER':
                cy.get(this.btnNewUser()).click()
                break
        }
    }

    validateInvalidCredentials() {
        cy.get(this.lblLoginError()).should('be.visible').and('include.text', INVALID_CREDENTIALS_MESSAGE)
    }

    validateUserIsNotLogged() {
        cy.get(this.inputUsername()).should('be.visible')
        cy.get(this.inputPassword()).should('be.visible')
        cy.get(this.btnLogout()).should('not.exist')
    }

    validateUserIsLogged() {
        cy.get(this.inputUsername()).should('not.exist')
        cy.get(this.inputPassword()).should('not.exist')
        cy.get(this.btnLogout()).should('be.visible')
        cy.get(this.lblUsername()).should('be.visible').and('include.text', randomUsername)

    }

    validateUserLogoff() {
        cy.get(this.btnGoToBookStore()).should('not.exist')
        cy.get(this.lblUsername()).should('not.exist')
    }

    userLogin(){
        cy.visit('/login')
        cy.fixture('validUsers').then(user => {
            cy.get(this.inputUsername()).type(user.username)
            cy.get(this.inputPassword()).type(user.password)
            cy.get(this.btnLogin()).click()
        })
    }

    goToBookStorePage(){
        cy.intercept('GET','**BookStore/v1/Books**').as('allBooks')
        cy.get(this.btnGoToBookStore()).scrollIntoView().click({force:true})
        cy.wait('@allBooks').then((response) => {
            cy.writeFile('cypress/fixtures/'+BOOKS_FIXTURE_NAME+'.json', response.response.body)
          });
    }

}
export default LoginActions