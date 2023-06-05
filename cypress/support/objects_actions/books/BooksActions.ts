import { faker } from "@faker-js/faker";
import { ADD_BOOK_TO_COLLECTION_BUTTON, BOOKS_FIXTURE_NAME } from "./BooksConstants";
import BooksObjects from "./BooksObjects";
import UserProfileActions from "../userProfile/UserProfileActions";

let searchedBook = ''
const userProfileActions = new UserProfileActions()
class BooksActions extends BooksObjects {

    searchBook(existOrNot: string, attribute: string) {
        let allBooksTitles: string[] = []
        let allBooksAuthors: string[] = []
        let allBooksPublishers: string[] = []

        if (existOrNot.toUpperCase() == 'AN EXISTENT') {
            cy.readFile('cypress/fixtures/' + BOOKS_FIXTURE_NAME + '.json').then((data) => {
                for (let i = 0; i < data.books.length; i++) {
                    allBooksTitles.push(data.books[i].title)
                    allBooksAuthors.push(data.books[i].author)
                    allBooksPublishers.push(data.books[i].publisher)
                }
                let bookTitle = allBooksTitles[Math.floor(Math.random() * allBooksTitles.length)]
                let bookAuthor = allBooksAuthors[Math.floor(Math.random() * allBooksAuthors.length)]
                let bookPublisher = allBooksPublishers[Math.floor(Math.random() * allBooksPublishers.length)]

                switch (attribute.toUpperCase()) {
                    case 'TITLE':
                        searchedBook = bookTitle
                        cy.get(this.inputSearchBook()).type(bookTitle)
                        break
                    case 'AUTHOR':
                        searchedBook = bookAuthor
                        cy.get(this.inputSearchBook()).type(bookAuthor)
                        break
                    case 'PUBLISHER':
                        searchedBook = bookPublisher
                        cy.get(this.inputSearchBook()).type(bookPublisher)
                        break
                }
            })
        } else {
            let randomBookAttribute = faker.person.fullName()
            searchedBook = randomBookAttribute
            cy.get(this.inputSearchBook()).type(randomBookAttribute)
        }
    }

    validateBookFound() {
        cy.get(this.booksFoundImg()).should('have.length.at.least', 1)
        cy.get(this.inputSearchBook()).then(($searchedBookName) => {
            cy.wrap($searchedBookName).invoke('text').then((bookText) => {
                cy.get(this.resultRows()).first().should('include.text', bookText)
            })
        })
    }

    validateBookNotFound() {
        cy.get(this.booksFoundImg()).should('have.length', 0)
        cy.get(this.bookName()).should('not.exist')
    }

    accessBookDetailsPage() {
        cy.intercept('GET', '**Book?ISBN**').as('bookDetails')
        cy.get(this.bookName()).first().click()
        cy.wait('@bookDetails')
    }

    addBookToCollection() {
        cy.get('button').contains(ADD_BOOK_TO_COLLECTION_BUTTON).click()
        cy.wait(1000)
    }

    validateNewBookAddedToCollection() {
        cy.visit('/profile')
        cy.get(userProfileActions.selectRowsPerPage()).select('100')
        cy.get(this.tableBody()).first().should('include.text', searchedBook)
    }
}
export default BooksActions