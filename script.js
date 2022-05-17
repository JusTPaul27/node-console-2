
const prompt = require('prompt');

const model = require('./models');

const pubblicationArray = [];

console.log('BENVENUTO IN BOOK MANAGER! ')
startMenu();

function startMenu() {
    console.log('Solo disponibili 3 opzioni');
    console.log('1) Aggiungi pubblicazioni');
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
        insertMenu();
    } else if (result.selection === '2') {
        printMenu();
    } else if (result.selection === '3') {
        console.log('Grazie e a presto!');
        process.exit();
    } else {
        console.log('Selezione non disponibile');
        startMenu()
    }
}

function insertBook() {

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
            type: {
                description: "Inserisci il genere",
            },
            price: {
                description: "Inserisci il prezzo",
            }
        }
    }
    prompt.get(schema, insertBookManager);
}

function insertBookManager(err, result) {
    const book = new model.Book(result.title, result.author, result.editor, result.type , result.price);

    pubblicationArray.push(book);
    console.log(pubblicationArray);
    startMenu()
}


function insertMenu() {
    console.log('Scegli cosa aggiungere da queste 3 opzioni');
    console.log('1) Aggiungi un libro');
    console.log('2) Aggiungi un magazine');
    console.log('3) torna al menù principale');

    const schema = {
        properties: {
            selection: {
                description: 'Seleziona una opzione',
            }
        }
    };

    prompt.get(schema, insertMenuManager);
}


function insertMenuManager(err, result) {
    if (result.selection === '1') {
        insertBook();
    } else if (result.selection === '2') {
        insertMagazine();
    } else if (result.selection === '3') {
        console.log('Grazie e a presto!');
        process.exit();
    } else {
        console.log('Selezione non disponibile');
        insertMenu()
    }
}


function insertMagazine() {

    const schema = {
        properties: {
            title: {
                description: 'Inserisci Titolo',
            },
            editor: {
                description: "Inserisci la casa editrice",
            } ,
            periodicity: {
                description: "Inserisci la periodicità",
            },
            release: {
                description: "Inserisci il release",
            },
            type: {
                description: "Inserisci il genere",
            },
            price: {
                description: "Inserisci il prezzo",
            }
        }
    }
    prompt.get(schema, insertMagazineManager);
}


function insertMagazineManager(err, result) {
    const magazine = new model.Magazine(result.title, result.editor,result.periodicity, result.release, result.type , result.price);

    pubblicationArray.push(magazine);
    console.log(pubblicationArray);
    startMenu()
}


function printMenu(params) {
    console.log('Scegli cosa aggiungere da queste 3 opzioni');
    console.log('1) Lista in ordine di inserimento');
    console.log('2) Lista in ordine alfabetico del titolo');
    console.log('3) Lista in ordine di prezzo');
    console.log('4) torna al menù principale');

    const schema = {
        properties: {
            selection: {
                description: 'Seleziona una opzione',
            }
        }
    };

    prompt.get(schema, printMenuManager);
}

function printMenuManager(err, result) {
    if (result.selection === '1') {
       printArray(pubblicationArray);
       startMenu();
    } else if (result.selection === '2') {
        printArrayByOrderTitle();
        startMenu()
    } else if (result.selection === '3') {
        printArrayByOrderPrice();
        startMenu();
    } else if (result.selection === '4') {
        console.log('Grazie e a presto!');
        startMenu();
    } else {
        console.log('Selezione non disponibile');
        printMenu()
    }
}


function printArray(arrayToPrint) {
    for (const pub of arrayToPrint) {
        console.log(pub.toString());
        console.log('---------------------');
    }

}


function printArrayByOrderTitle() {
    
    const copy = [...pubblicationArray];
    copy.sort(comparePubblicationByTitle);
    printArray(copy);
}


function comparePubblicationByTitle(pub1, pub2) {
    return pub1.title.localeCompare(pub2.title)
}

function printArrayByOrderPrice() {
    const copy = [...pubblicationArray];
    copy.sort(comparePubblicationByPrice);
    printArray(copy);
}

function comparePubblicationByPrice(pub1, pub2) {
    return pub2.price - pub1.price
}

/////Fare lista libri, dare la possibilità di ordinare per titolo o data
////mettere nella opzone 1 la pubblicazione con possibilità di mettere book o mgazine

