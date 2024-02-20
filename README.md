# Installation

- Clone the repository and go to the main directory
- Run `docker compose up -d` to start the server

You'll have access to the frontend at `http://localhost:80` and the backend at `http://localhost:8080`

# Tests

- run `docker exec express npm run test` to execute the tests
- run `docker exec express npm run test:coverage` to execute tests with a coverage report
- run `docker exec react npm test` to execute the Cypress tests

# Bonus faits
1. Respect du délai théorique entre les propositions des cartes selon la date de dernière réponse et la catégorie
2. Tests end-to-end avec cypress suivant :
```
Fonctionnalité: Création de fiches intégrées dans le système
Contexte: Étant donné que l'utilisateur est connecté à son compte
Scénario: Création d'une fiche en catégorie 1
Quand l'utilisateur accède à la page de création de fiche
Et qu'il remplit les champs obligatoires suivants :
| Champ    | Valeur                  |
| question | Qu'est ce que le TDD ?  |
| answer   | Test Driven Development |
| tag?     | Testing                 |
Et qu'il clique sur le bouton de création
Alors la fiche devrait être enregistrée dans le système
Et la fiche devrait être associée à la catégorie 1
Et l'utilisateur devrait voir un message de confirmation de création de fiche
```

# Troubleshooting

If you have any problems with the installation using docker, you can still run the server locally using nodemon.
Just go to the `front` and `back` directories and run `npm install` and `npm run dev` in each one.
To run tests, go to the `back` directory and run `npm run test` or `npm run test:coverage`
