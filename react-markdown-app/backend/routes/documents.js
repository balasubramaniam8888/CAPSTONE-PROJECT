const express = require('express');
const jwt = require('jsonwebtoken');
const Document = require('../models/Document');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Create a new document
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const document = new Document({ userId: req.user.userId, title, content });
    await document.save();
    res.status(201).send('Document created');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Retrieve all documents for a user
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.userId });
    res.send(documents);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Retrieve a single document
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || document.userId.toString() !== req.user.userId) {
      return res.status(404).send('Document not found');
    }
    res.send(document);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a document
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const document = await Document.findById(req.params.id);
    if (!document || document.userId.toString() !== req.user.userId) {
      return res.status(404).send('Document not found');
    }
    document.title = title;
    document.content = content;
    await document.save();
    res.send('Document updated');
  } catch (err) {
    res.status(400).send(err);
  }
});


// Delete a document

router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Attempting to delete document with ID: ${req.params.id}`);
    const document = await Document.findById(req.params.id);
    if (!document || document.userId.toString() !== req.user.userId) {
      console.log('Document not found or user not authorized');
      return res.status(404).send('Document not found');
    }
    await document.deleteOne();
    console.log('Document deleted');
    res.send('Document deleted');
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(400).send({ error: 'Error deleting document', details: err.message });
  }
});





module.exports = router;

