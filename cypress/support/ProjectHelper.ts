import { BOOKS_ENDPOINT, BOOKS_FIXTURE_NAME } from "./objects_actions/books/BooksConstants";

class ProjectHelper {

    constructor() {

    }

    generateRandomString(maxLenght: number) {
        return Math.random().toString(36).substring(2, maxLenght);
    }


    generateBooksFixture() {
        cy.request(Cypress.env('baseUrl') + BOOKS_ENDPOINT).then((response) => {
            console.log(response.body)
            cy.writeFile('cypress/fixtures/' + BOOKS_FIXTURE_NAME + '.json', response.body)
        })
    }

}

export default ProjectHelper