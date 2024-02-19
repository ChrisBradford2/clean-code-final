const values = [
  {
    question: 'How to create a new React app?',
    answer: 'npx create-react-app my-app',
    tag: 'programming'
  },
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
    tag: 'geography'
  },
  {
    question: "Who is the author of Harry Potter?",
    answer: "J.K. Rowling",
    tag: "literature"
  }
]

const randomValue = values[Math.floor(Math.random() * values.length)];

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
    cy.get('input[placeholder="Question"]').type(randomValue.question);
    cy.get('input[placeholder="Réponse"]').type(randomValue.answer);
    cy.get('input[placeholder="Tag"]').type(randomValue.tag);

    cy.get('input[placeholder="Question"]').should('have.value', randomValue.question);
    cy.get('input[placeholder="Réponse"]').should('have.value', randomValue.answer);
    cy.get('input[placeholder="Tag"]').should('have.value', randomValue.tag);
  });

  it('should display error messages when form is submitted with empty inputs', () => {
    cy.get('button').contains('Ajouter').click();

    cy.contains('La question est obligatoire').should('exist');
    cy.contains('La réponse est obligatoire').should('exist');
  });

  it('should call onNewCard when form is submitted with valid inputs', () => {
    cy.get('input[placeholder="Question"]').type(randomValue.question);
    cy.get('input[placeholder="Réponse"]').type(randomValue.answer);
    cy.get('input[placeholder="Tag"]').type(randomValue.tag);

    cy.get('button').contains('Ajouter').click();
  });

  it('should see a new card when form is submitted with valid inputs', () => {
    cy.get('div').contains(randomValue.question).should('exist');
    cy.get('div').contains(randomValue.answer).should('exist');
    cy.get('div').contains(randomValue.tag).should('exist');
  });
});
