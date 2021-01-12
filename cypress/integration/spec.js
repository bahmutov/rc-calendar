/// <reference types="cypress" />
describe('rc-calendar', () => {
  it('picks date', () => {
    cy.visit('/')
    cy.get('.calendarSelect').click()

    // the calendar value is empty
    cy.get('.rc-calendar-input').should('have.value', '')

    cy.get('.rc-calendar-cell.rc-calendar-selected-day')
      .first()
      .children('.rc-calendar-date')
      .click()

    // the calendar input should be filled
    cy.get('.rc-calendar-input').should('not.have.value', '')
      .invoke('attr', 'value') // the value could be like "1/13/2021"
      .should('include', '2021') // at least the current year is there
  })
})
