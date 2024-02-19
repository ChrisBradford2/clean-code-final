describe('CardForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cards');
  });

  it('should render the form inputs', () => {
    cy.get('input[placeholder="Question"]').should('exist');
    cy.get('input[placeholder="Réponse"]').should('exist');
    cy.get('input[placeholder="Tag"]').should('exist');
    cy.get('button').contains('Ajouter').should('exist');
  });

  it('should update the state when inputs change', () => {
    cy.get('input[placeholder="Question"]').type('What is your name?');
    cy.get('input[placeholder="Réponse"]').type('My name is John doe.');
    cy.get('input[placeholder="Tag"]').type('programming');

    cy.get('input[placeholder="Question"]').should('have.value', 'What is your name?');
    cy.get('input[placeholder="Réponse"]').should('have.value', 'My name is John doe.');
    cy.get('input[placeholder="Tag"]').should('have.value', 'programming');
  });

  it('should display error messages when form is submitted with empty inputs', () => {
    cy.get('button').contains('Ajouter').click();

    cy.contains('La question est obligatoire').should('exist');
    cy.contains('La réponse est obligatoire').should('exist');
  });

  it('should call onNewCard when form is submitted with valid inputs', () => {
    cy.get('input[placeholder="Question"]').type('What is your name?');
    cy.get('input[placeholder="Réponse"]').type('My name is John doe.');
    cy.get('input[placeholder="Tag"]').type('programming');

    cy.get('button').contains('Ajouter').click();
  });

  it('should see a new card when form is submitted with valid inputs', () => {
    cy.get('div').contains('What is your name?').should('exist');
    cy.get('div').contains('My name is John doe.').should('exist');
    cy.get('div').contains('programming').should('exist');
  });
});
