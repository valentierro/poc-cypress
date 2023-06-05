import { Given } from '@badeball/cypress-cucumber-preprocessor'
import UserProfileActions from '../objects_actions/userProfile/UserProfileActions'

const userProfileActions = new UserProfileActions()
Cypress.on('uncaught:exception', () => {
    return false
})


Given('user accesses book store {string} page', (page: string) => {
    switch (page.toUpperCase()) {
        case 'LOGIN':
            cy.visit('/login', { timeout: 180000 })

            break
        case 'PROFILE':
            cy.visit('/profile', { timeout: 180000 })
            cy.get(userProfileActions.selectRowsPerPage()).select('100')
            break
    }
})