describe('register', () => {
 
  //Arrange
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    // Act
    cy.get('[data-cy= "ad-input"]').type("Emre");
    // Assert
    cy.get('[data-cy= "submit- button"]').should("not.be.disabled");
  })
})