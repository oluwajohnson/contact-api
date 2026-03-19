// const { getDb } = require('../data/database');
// const { ObjectId } = require('mongodb');

// const getAll = async (req, res) => {
//   const db = getDb();
//   const result = await db.collection('contacts').find();

//   result.toArray().then((contacts) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(contacts);
//   });
// };

// const getSingle = async (req, res) => {
//   const db = getDb();
//   const contactId = new ObjectId(req.params.id);

//   const result = await db
//     .collection('contacts')
//     .find({ _id: contactId });

//   result.toArray().then((contact) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(contact[0]);
//   });
// };

// module.exports = { getAll, getSingle };






const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all contacts
const getAll = async (req, res) => {
  const db = getDb();
  const result = await db.collection('contacts').find();
  const contacts = await result.toArray();
  res.status(200).json(contacts);
};

// GET single contact
const getSingle = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);
  const result = await db.collection('contacts').find({ _id: contactId });
  const contact = await result.toArray();
  res.status(200).json(contact[0]);
};

// POST create contact
const createContact = async (req, res) => {
  const db = getDb();

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await db.collection('contacts').insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response);
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await db.collection('contacts').replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);

  const response = await db.collection('contacts').deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(200).send();
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};