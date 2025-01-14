
const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../model/bookschema');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

router.post('/create', upload.fields([{ name: 'image' }, { name: 'pdf' }]), async (req, res) => {
    const { title, author, description, price } = req.body;
    const image = req.files.image ? req.files.image[0].path : null;
    const pdf = req.files.pdf ? req.files.pdf[0].path : null;
  
    // Check if all required fields are present
    if (!title || !author || !description || !price || !image || !pdf) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const newBook = new Book({
        image,
        title,
        author,
        description,
        price,
        pdf,
      });
  
      await newBook.save();
      res.status(201).json({ message: 'Book created successfully', book: newBook });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
router.get('/all', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
      }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router;    
