/// <reference types="Cypress" />

describe('template spec', () => {
  it('The main page', () => {
    cy.visit('/')
    cy.contains('All notes').should('exist')
    cy.contains('You don\'t have any notes').should('exist')
    cy.get('a[href="/create"]').click()
    cy.get('input#title').type('This is a note{enter}')
    cy.get('textarea#body').type("# I love taking notes{enter}This is an awesome application")
    cy.get('a[href="/"]').click()
    cy.get('a[href="/notes/1"]').click()
    cy.contains('This is a note').should('exist')
    cy.get('a[href="/notes/1/edit"]').click()
    cy.get('textarea#body').type("{enter}{enter}I have updated the notes!")
    cy.get('a[href="/notes/1"]').click()
    cy.contains('I have updated the notes!').should('exist')
    cy.get('#deleteIcon').click()
    cy.window().then(window => {
      window.indexedDB.deleteDatabase('notes')
    })
  })
})