# Word Dictionary TS Express App

Welcome to the Word Dictionary TS Express App repository! This TypeScript-based Express.js application serves as a word dictionary, providing endpoints for users to retrieve definitions, synonyms, antonyms, and examples for queried words.

## Features

- **Get Word Definitions, Synonyms, Antonyms, Examples:** Retrieve definitions, synonyms, antonyms and examples for queried words.
- **Add Word:** Add new word and definitions, synonyms, antonyms and examples is automatically fetched and added in the database. 
- **Update Word Or Multiple Words:** Update a single word based on word "Id" or update multiple words based on a certain "condition".
- **Delete Word:** Delete word based on word "Id".
- **Search Word Or Multiple Words:** Search a single word based on word "Id" or update multiple words based on a certain "condition".

## Installation

To run this application locally, follow these steps:

1. Clone this repository: `git clone https://github.com/Mughees09/word-dictionary-ts-express-app.git`
2. Navigate to the project directory: `cd word-dictionary-ts-express-app`
3. Install dependencies: `npm install`
4. Start the application: `npm start`
5. Access the application in your browser at `http://localhost:3000`

## Usage

Once the application is running, you can use it by sending HTTP requests to the provided endpoints. Here are the available endpoints:

- `/getWord`: Get all words present in the database.
- `/insertWord`: Add word in the database.
- `/updateWord`: Update word in the database.
- `/deleteWord`: Delete word in the database.
- `/searchWord`: Search word in the database.

Example request:

```bash
curl http://localhost:3000/dictionary/getWord
