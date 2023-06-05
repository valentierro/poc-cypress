Feature: Book Store Search

    Search and add books to user collection in Book Store

    Background: Access Book Store
        #Given user accesses book store login page
        Given user is logged
        And user goes to book store page

    @All @Search
    Scenario: Add book to collection
        Given user searches for "an existent" book by "title"
        And the book should be found
        And user should be able to access books details page
        When add the book to user collection
        Then the book shuold be added to user collection

    @All @Smoke @Search
    Scenario Outline: Validate books search by "<book_attribute>" - Results found
        When user searches for "an existent" book by "<book_attribute>"
        Then the book should be found
        And user should be able to access books details page

        Examples:
            | book_attribute |
            | title          |
            | author         |
            | publisher      |

    @All @Search
    Scenario: Validate books search - No Results found
        When user searches for "a non existent" book by "title"
        Then the book should not be found

