let myLibrary = [{
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 384,
    read: 'no',
    id: "7f45c432-bc3e-4b58-8fd1-c05fb937cb1b"
}]

addNewCard()

class Book {
    constructor(name, author, pages, read, id) {
        this.name = name,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.id = id
    }

    info() {
        return {
            name: this.name,
            author: this.author,
            pages: this.pages,
            read: this.read,
            id: this.id
        }
    }

}

function addBookToLibrary(name, author, pages, read) {
    const id = crypto.randomUUID()
    const book = new Book(name, author, pages, read, id)
    myLibrary.push(book.info())
    addNewCard()
}

function addNewCard() {
    const obj = myLibrary[myLibrary.length - 1]
    const cards = document.querySelector('.cards')
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.id = obj.id
    cards.appendChild(newCard)
    const divTop = document.createElement('div')
    const divBottom = document.createElement('div')
    divTop.classList.add('top')
    divBottom.classList.add('bottom')

    newCard.appendChild(divTop)
    const divName = document.createElement('div')
    const divAuthor = document.createElement('div')
    const divPages = document.createElement('div')
    divName.classList.add('name')
    divAuthor.classList.add('author')
    divPages.classList.add('pages')
    divName.textContent = obj.name
    divAuthor.textContent = obj.author
    divPages.textContent = obj.pages + ' PAGES'
    divTop.appendChild(divName)
    divTop.appendChild(divAuthor)
    divTop.appendChild(divPages)

    
    newCard.appendChild(divBottom)
    const divReads = document.createElement('div')
    divReads.classList.add('reads')


    divBottom.appendChild(divReads)
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.name = 'read'
    input.id = 'read'
    const label = document.createElement('label')
    label.setAttribute('for', input.id)
    label.textContent = 'Read'
    divReads.appendChild(input)
    divReads.appendChild(label)

    if (obj.read === 'yes') {
        input.checked = true;
        const card = input.closest('.card');
        const topSection = card.querySelector('.top');
        topSection.classList.add('striked');
    }

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('delete')
    btnDelete.textContent = 'DELETE'
    divBottom.appendChild(btnDelete)

}

const btnNewCard = document.querySelector('.new-card')
const btnCancel  = document.querySelector('.cancel')
const modal = document.querySelector('dialog')
const btnNewCardClick = btnNewCard.addEventListener('click', () => {
    modal.showModal()
});
const btnCancelClick = btnCancel.addEventListener('click', () => {
    modal.close()
    document.activeElement.blur()
})

const form = document.querySelector('#book-form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#book-name').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#book-pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;

    addBookToLibrary(name, author, pages, read);
    modal.close();
    form.reset();
});



const cards = document.querySelector('.cards');

cards.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const id = e.target.closest('.card').id
        e.target.closest('.card').remove();
        myLibrary = myLibrary.filter(book => book.id !== id)
    }
});


cards.addEventListener('change', (e) => {
  if (!e.target.matches('.read'));

  const card = e.target.closest('.card');

  const topSection = card.querySelector('.top');

  if (e.target.checked) {
    topSection.classList.add('striked');
  } else {
    topSection.classList.remove('striked');
  }
});