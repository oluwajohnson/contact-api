const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  const db = getDb();
  const result = await db.collection('contacts').find();

  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);

  const result = await db
    .collection('contacts')
    .find({ _id: contactId });

  result.toArray().then((contact) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact[0]);
  });
};

module.exports = { getAll, getSingle };