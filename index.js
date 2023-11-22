const express = require('express');
const bookRouter = require('./routes/bookRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/api/books', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);