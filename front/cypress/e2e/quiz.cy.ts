// Définition de valeurs testées
const value = {
  question: 'How to create a new React app?',
  answer: 'npx create-react-app my-app',
  tag: 'programming'
};

Cypress.Commands.add('addCard', (value) => {
  cy.visit('http://localhost:3000/cards');
  cy.get('input[placeholder="Question"]').type(value.question);
  cy.get('input[placeholder="Réponse"]').type(value.answer);
  cy.get('input[placeholder="Tag"]').type(value.tag);
});

describe('Quiz', () => {
  it('should render the form inputs', () => {
    cy.visit('http://localhost:3000/cards');
    cy.get('input[placeholder="Question"]').should('exist');
    cy.get('input[placeholder="Réponse"]').should('exist');
    cy.get('input[placeholder="Tag"]').should('exist');
    cy.get('button').contains('Ajouter').should('exist');
  });

  it('should update the state when inputs change', () => {
    cy.addCard(value);
    cy.get('input[placeholder="Question"]').should('have.value', value.question);
    cy.get('input[placeholder="Réponse"]').should('have.value', value.answer);
    cy.get('input[placeholder="Tag"]').should('have.value', value.tag);
  });

  it('should display error messages when form is submitted with empty inputs', () => {
    cy.visit('http://localhost:3000/cards');
    cy.get('button').contains('Ajouter').click();
    cy.contains('La question est obligatoire').should('exist');
    cy.contains('La réponse est obligatoire').should('exist');
  });

  it('should call onNewCard when form is submitted with valid inputs', () => {
    cy.addCard(value);
    cy.get('button').contains('Ajouter').click();
  });

  it('should see a new card when form is submitted with valid inputs', () => {
    cy.addCard(value);
    cy.get('button').contains('Ajouter').click();
    cy.get('div').contains(value.question).should('exist');
    cy.get('div').contains(value.answer).should('exist');
    cy.get('div').contains(value.tag).should('exist');
  });

  it("should display 'Mauvaise réponse' message when the answer is incorrect", () => {
    cy.visit("http://localhost:3000");
    cy.get("input").type("Je ne sais pas :(");
    cy.get("button").contains('Valider').click();
    cy.get("h3").should("contain", "Mauvaise réponse :(");
    cy.get("p").should("contain", `La réponse était : ${value.answer}`);
    cy.get("p").should("contain", "Vous avez répondu : Je ne sais pas :(");
    cy.get("button").contains("Passer à la question suivante").click();
  });

  it("should display 'Bonne réponse !' message when the answer is correct", () => {
    cy.addCard(value);
    cy.get('button').contains('Ajouter').click();
    cy.visit("http://localhost:3000");
    cy.get("input").type(value.answer);
    cy.get("button").contains('Valider').click();
    cy.get("h3").should("contain", "Bonne réponse ! :D");
  });
});
