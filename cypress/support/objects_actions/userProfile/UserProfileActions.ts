import UserProfileObjects from "./UserProfileObjects";


let currentBooksOnCollection = 0
let booksOnCollectionAfterDeletion = 0

class UserProfileActions extends UserProfileObjects {

    clickToDeleteABook(){
        cy.get(this.selectRowsPerPage()).select('100')
        cy.get(this.imgBooks())
        .then(($books) => {
            currentBooksOnCollection = $books.length

        })
        cy.get(this.btnDeleteBook()).first().click()
    }

    clickToDeleteAllBooks(){
        cy.get(this.selectRowsPerPage()).select('100')
        cy.get(this.imgBooks())
        .then(($books) => {
            currentBooksOnCollection = $books.length

        })
        cy.get('button').contains('Delete All Books').click({force:true})
    }

    validateAllBookDeletion(){
        cy.get(this.imgBooks()).should('not.exist')
    }

    bookDeletionConfirmation(optionDelete: string){
        if(optionDelete.toUpperCase() == 'CONFIRMS'){
            cy.get(this.btnOkModal()).click()
        }else{
            cy.get(this.btnCancelModal()).click()
        }
    }

    validateBookDeletion(){
        cy.wait(1000)
        cy.get(this.selectRowsPerPage()).select('100')
        cy.get(this.imgBooks())
        .then(($books) => {
            booksOnCollectionAfterDeletion = $books.length

        }).then(()=>{
            expect(booksOnCollectionAfterDeletion).eq(currentBooksOnCollection-1)
        })
    }

    validateCancelBookDeletion(){
        cy.wait(1000)
        cy.get(this.selectRowsPerPage()).select('100')
        cy.get(this.imgBooks())
        .then(($books) => {
            booksOnCollectionAfterDeletion = $books.length

        })
        .then(()=>{
            expect(booksOnCollectionAfterDeletion).eq(currentBooksOnCollection)
        })
    }

}
export default UserProfileActions