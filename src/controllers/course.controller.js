const courseModel = require("../models/course");

// create
const create = async (req, res, _next) => {
  const { title, author, publisher, description, price } = req.body;
  if (title === undefined) {
    return res.status(400).send({
      message: "Title is required",
    });
  }
  const post = await courseModel.create({
    title: title,
    author: author,
    publisher: publisher,
    description: description,
    price: price,
  });
  return res.send({
    message: "Success",
    data: "post",
  });
};

// get all data
const getAllData = async (_req, res, _next) => {
  const getData = await courseModel.findAll();

  if (getData === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan!" });
  }

  return res.send({
    message: "Success",
    data: getData,
  });
};

// get id
const getById = async (req, res, _next) => {
  const { id } = req.params;
  const byId = await courseModel.findByPk(id);

  if (byId === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan!" });
  }

  return res.send({
    message: "Success",
    data: byId,
  });
};

// update
const updateData = async (req, res, _next) => {
  const { id } = req.params;
  const update = await courseModel.update(req.body, { where: { id: id } });
  if (update === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan!" });
  }
  const updateRow = await courseModel.findByPk(id);
  return res.send({
    message: "Success",
    data: updateRow,
  });
};

// delete
const deleted = async (req, res, _next) => {
  const { id } = req.params;
  const deleteId = courseModel.destroy({ where: { id: id } });
  if (deleteId === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan!" });
  }
  const deletebyId = await courseModel.findByPk(id);

  return res.send({
    message: `Success: Data dengan ID ${id} berhasil dihapus.`,
    data: deletebyId,
  });
};

module.exports = { create, getAllData, getById, updateData, deleted };
