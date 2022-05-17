class Pubblication {

    constructor(title, editor, type, price, copies, discount, tax) {
        this.title = title;
        this.editor = editor;
        this.type = type;
        this.price = price;
        this.copies = copies;
        this.discount = discount;
        this.tax = tax
    }


    toString() {
        const pubblicationString = 
            'Title: ' + this.title + '\n' +
            'Editor: ' + this.editor + '\n' +
            'Type: ' + this.type + '\n' +
            'Price: ' + this.getPubblicPrice() + ' €\n' +
            'Copies in store: ' + this.copies + '\n' +
            'Discount in %: ' + this.discount + '%' ;
        return pubblicationString
    }

    getPubblicPrice(){
        const discount = this.price * this.discount /100 ;
        const margin = this.price * 30 / 100;
        const tax = this.price * this.tax /100;
        const pubblicPrice = this.price - discount + margin + tax
        const roundedPubblicPrice = Math.round(pubblicPrice, 2)
        return roundedPubblicPrice
    }

    static round(number, decimalPlace){             /// Le funzioni si possono dichiarare statiche poichè non hanno nessun "This.", quindi non variano per l'oggetto
        const roundString = number.toFixed(decimalPlace);
        const roundNumber = parseFloat(roundString);
        return roundNumber;
    }
}


class Book extends Pubblication{

    constructor (title, author, editor='Non disponibile', type='Non classificato', price = -1, copies = 0, pagesNumber = -1, yop = -1, discount = 0){
        super(title, editor, type, price, copies, discount, 10);
        this.author = author
        this.pagesNumber = pagesNumber;
        this.yop = yop;
    }


    toString(){
        const book = super.toString() + '\n' +

            'Author: ' + this.author + '\n' +
            'Number of pages: ' + this.pagesNumber + '\n' +
            'Year of pubblication: ' + this.yop ;
        return book
    }
}


class Magazine extends Pubblication{

    constructor(title, editor, periodicity = 'non disponibile', release, type = 'non classificato', price = -1, copies = 0, discount = 0, releaseDate = new Date()){
        super(title, editor, type, price, copies, discount, 20);
        this.periodicity = periodicity;
        this.release = release;
        this._releaseDate = releaseDate.getTime();
    }

    get releaseDate(){
        const date = new Date(this._releaseDate);
        return date;
    }

    set releaseDate(value){
        const time = value.getTime();
        this._releaseDate = time;
        
    }

    
        toString(){
            const magazine = super.toString() + '\n' +
                        'Periodicity: ' + this.periodicity + '\n' +
                        'Release number: ' + this.release + '\n' +
                        'Release date: ' + this.releaseDate.toString() + '\n';
                        return magazine
        }

}

function pubblicationFactory(obj) {
    
    if (obj.author ) { /////Uso author poichè presente solo in book
        return new Book(obj.title, obj.author, obj.editor, obj.type, obj.price, obj.copies, obj.pagesNumber, obj.yop, obj.discount)
    } else{
        return new Magazine(obj.title, obj.editor, obj.periodicity, obj.release, obj.type, obj.price, obj.copies, obj.discount, new Date(obj._releaseDate))
    }
}

exports.Book = Book;
exports.Magazine = Magazine;
exports.pubblicationFactory = pubblicationFactory;