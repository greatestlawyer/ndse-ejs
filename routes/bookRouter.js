const express = require('express');
const fileMulter = require('../middleware/file');
const { v4: uuid } = require('uuid');

const router = express.Router();

class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = "",
    id = uuid()
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

const bookStor = {
  book: []
};

router.get('/', (req, res) => {
  const { book } = bookStor;
  res.render('books/index', {
    title: 'Books',
    books: book
  });
});

router.get('/create', (req, res) => {
  const { book } = bookStor;
  res.render('books/create', {
    title: 'Book create',
    books: book
  });
});

router.post('/create', fileMulter.single('fileBook'), (req, res) => {
  const { book } = bookStor;

  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body;
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );
  book.push(newBook);
  res.redirect('/api/books');
});

router.get('/:id', (req, res) => {
  const { book } = bookStor;

  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.render('books/view', {
      title: 'Book view',
      books: book[idx]
    });
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.get('/update/:id', (req, res) => {
  const { book } = bookStor;

  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.render('books/update', {
      title: 'Book update',
      books: book[idx]
    });
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.post('/update/:id', fileMulter.single('fileBook'), (req, res) => {
  const { book } = bookStor;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body;

  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);

  if (idx !== -1) {
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };
    res.redirect(`/api/books/${id}`);
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.put('/:id', fileMulter.single('fileBook'), (req, res) => {
  const { book } = bookStor;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body;
  const fileBook = req.file.path;
  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);

  if (idx !== -1) {
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };
    res.render('books/update', {
      title: 'Book | view',
      books: book[idx]
    });
    res.json(book[idx]);
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.get('/:id/download', (req, res) => {
  const { book } = bookStor;
  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);
  if (idx !== -1) {
    res.download(book[idx].fileBook, book[idx].fileName);
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.delete('/:id', (req, res) => {
  const { book } = bookStor;
  const { id } = req.params;
  const idx = book.findIndex((el) => el.id === id);

  if (idx !== -1) {
    book.splice(idx, 1);
    res.redirect('/book');
  } else {
    res.status(404).json({ errcode: 404, errmsg: 'Cтраница не найдена' });
  }
});

router.post('/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

module.exports = router;