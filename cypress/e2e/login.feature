Feature: Book Store Login

    Login in Book Store

    Background: Access Book Store Login page
        Given user accesses book store "login" page

    @All @Login @Smoke
    Scenario: Validate behavior when user tries to login with invalid credentials
        Given user informs "invalid" username and password
        When user clicks on "login" button
        Then system should inform invalid credentials
        And user should not be able to login

    @All @Login @Smoke
    Scenario: Validate login in the system with valid credentials
        Given user informs "valid" username and password
        When user clicks on "login" button
        Then user should be able to login

    @All @Login @Smoke
    Scenario: Validate system logout
        Given user informs "valid" username and password
        And user clicks on "login" button
        And user should be able to login
        When user clicks on "logout" button
        Then user should be logged out

