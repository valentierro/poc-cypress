import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import LoginActions from '../objects_actions/login/LoginActions'
import BooksActions from '../objects_actions/books/BooksActions'
import UserProfileActions from '../objects_actions/userProfile/UserProfileActions'

const loginActions = new LoginActions()
const booksActions = new BooksActions()
const userProfileActions = new UserProfileActions()
Cypress.on('uncaught:exception', () => {
  return false
})


Given('user informs {string} username and password', (validOrInvalidPassword: string) => {
  loginActions.fillCredentials(validOrInvalidPassword)
})

When('user clicks on {string} button', (buttonName: string) => {
  loginActions.clickOnButton(buttonName)
})

Then('system should inform invalid credentials', () => {
  loginActions.validateInvalidCredentials()
})

Then('user should not be able to login', () => {
  loginActions.validateUserIsNotLogged()
})

Then('user should be able to login', () => {
  loginActions.validateUserIsLogged()
})

Then('user should be logged out', () => {
  loginActions.validateUserLogoff()
})

Given('user is logged', () => {
  loginActions.userLogin()
  loginActions.validateUserIsLogged()
})

Given('user goes to book store page', () => {
  loginActions.goToBookStorePage()
})

Given('user searches for {string} book by {string}', (existOrNot: string, attribute: string) => {
  booksActions.searchBook(existOrNot, attribute)
})

Then('the book should be found', () => {
  booksActions.validateBookFound()
})

Then('the book should not be found', () => {
  booksActions.validateBookNotFound()
})

Then('user should be able to access books details page', () => {
  booksActions.accessBookDetailsPage()
})

Then('add the book to user collection', () => {
  booksActions.addBookToCollection()
})

Then('the book shuold be added to user collection', () => {
  booksActions.validateNewBookAddedToCollection()
})

Given('adds a new book to collection', () => {
  loginActions.goToBookStorePage()
  booksActions.searchBook('AN EXISTENT', 'title')
  booksActions.validateBookFound()
  booksActions.accessBookDetailsPage()
  booksActions.addBookToCollection()
  booksActions.validateNewBookAddedToCollection()
})

When('user clicks to delete a book', () => {
  userProfileActions.clickToDeleteABook()
})

When('user {string} book deletion', (optionDelete: string) => {
  userProfileActions.bookDeletionConfirmation(optionDelete)
})

Then('the book should be removed from user collection', () => {
  userProfileActions.validateBookDeletion()
})

Then('the book should not be removed from user collection', () => {
  userProfileActions.validateCancelBookDeletion()
})

Given('adds {string} new books to collection', (qtdBooks: string) => {

  for (let i=0;i<Number(qtdBooks);i++){
    loginActions.goToBookStorePage()
    booksActions.searchBook('AN EXISTENT', 'title')
    booksActions.validateBookFound()
    booksActions.accessBookDetailsPage()
    booksActions.addBookToCollection()
    booksActions.validateNewBookAddedToCollection()
  }
})

Then('user clicks to delete all books', () => {
  userProfileActions.clickToDeleteAllBooks()
})

Then('all books should be removed from user collection', () => {
  userProfileActions.validateAllBookDeletion()
})

