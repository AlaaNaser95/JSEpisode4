/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  let list = books.filter(book => book.id === bookId);
  return list[0];
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  let list = authors.filter(
    author => author.name.toLowerCase() === authorName.toLowerCase()
  );
  return list[0];
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  let list = authors.map(author => {
    return { author: author.name, bookCount: author.books.length };
  });
  return list;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  books.forEach(book => {
    if (colors[book.color]) {
      colors[book.color].push(book.title);
    } else {
      colors[book.color] = [book.title];
    }
  });
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  let auth = getAuthorByName(authorName, authors);
  if (!auth) {
    return [];
  }
  let abooks = books.filter(book => {
    return auth.books.includes(book.id);
  });
  return abooks.map(abook => abook.title);
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let max = 0;
  let name = "";
  authors.forEach(author => {
    if (author.books.length > max) {
      max = author.books.length;
      name = author.name;
    }
  });
  return name;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let theBook = getBookById(bookId, books);
  let auths = theBook.authors;
  auths = authors.filter(b => {
    if (auths.length == 1) {
      return b.name == auths[0].name;
    }
    return b.name == auths[0].name || b.name == auths[1].name;
  });
  // theBook.authors.forEach(a => auths.push(getBookById(a, books)));
  let bookTitles = [];
  auths.forEach(auth =>
    auth.books.forEach(authBook => {
      if (!bookTitles.includes(getBookById(authBook, books).title))
        bookTitles.push(getBookById(authBook, books).title);
    })
  );
  return bookTitles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // authors.forEach(auth=>
  //   {
  //     auth.books.forEach(book =>
  //       {authors.forEach(auth.books=>
  //         { author.books.forEach(abook=> {if(abook===book)count=true;})
  //         })
  //     })
  //   })
  // for(let i=0; i<=authors.length;i++){
  //   let b=authors[i].books;
  //   for (let i=0; i<b.length;i++)
  // }
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

console.log(getBookById(12, books));
console.log(getAuthorByName("J.K. Rowling", authors));
console.log(bookCountsByAuthor(authors));
console.log(booksByColor(books));
console.log(titlesByAuthorName("George R.R. Martin", authors, books));
console.log(mostProlificAuthor(authors));
console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
