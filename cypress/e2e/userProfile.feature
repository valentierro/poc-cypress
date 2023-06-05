Feature: User Profile

    Manage user profile and books collections

    Background: Access User profile page
        Given user is logged
        

    @All @Smoke @UserProfile
    Scenario: Delete one book from collection
        Given adds "3" new books to collection
        And user accesses book store "profile" page
        When user clicks to delete a book
        And user "confirms" book deletion
        Then the book should be removed from user collection

    @All @Smoke @UserProfile
    Scenario: Cancel one book deletion collection
        Given adds "1" new books to collection
        When user clicks to delete a book
        And user "cancel" book deletion
        Then the book should not be removed from user collection

    @All @UserProfile
    Scenario: Delete all books from collection
        Given adds "3" new books to collection
        When user clicks to delete all books
        And user "confirms" book deletion
        Then all books should be removed from user collection
