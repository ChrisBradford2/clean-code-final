class QuizzService {
  constructor({ storageConnector }) {
    this.storageConnector = storageConnector;
  }

  getQuizz() {
    return this.storageConnector.getCards();
  }
}

module.exports = {
    QuizzService,
    quizzServiceContainer: "quizzService"
}