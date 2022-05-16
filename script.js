
const prompt = require('prompt');

const model = require('./models');

const bookArray = [];

console.log('BENVENUTO IN BOOK MANAGER! ')
startMenu();

function startMenu() {
console.log('Solo disponibili 3 opzioni');
console.log('1) Aggiungi un libro');
console.log('2) Lista dei libri');
console.log('3) Esci');

    prompt.start();

const schema = {
    properties: {
      selection: {
        description: 'Seleziona una opzione',
      }
    }
  };
  prompt.get(schema, startMenuManager);
}


function startMenuManager(err, result) {
    if (result.selection === '1') {
        insertBook();
    } else if (result.selection === '2') {

    } else if (result.selection === '3') {
        console.log('Grazie e a presto!');
        process.exit();
    } else {
        console.log('Selezione non disponibile');
        startMenu()
    }
}

function insertBook(params) {

    const schema = {
        properties: {
            title: {
                description: 'Inserisci Titolo',
            },
            author: {
                description: "Inserisci l'autore",
            },
            editor: {
                description: "Inserisci la casa editrice",
            },


        }
    }
    prompt.get(schema, insertBookManager);
}

function insertBookManager(err, result) {
    const book = new model.Book(result.title, result.author, result.editor);

    bookArray.push(book);
    console.log(bookArray);
    startMenu()
}


/////Fare lista libri, dare la possibilità di ordinare per titolo o data 
////mettere nella opzone 1 la pubblicazione con possibilità di mettere book o mgazine

