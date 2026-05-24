const { Op } = require("sequelize");
const courseModel = require("../models/course");

// create
const create = async (req, res, _next) => {
  const { title, author, publisher, description, price, user_id } = req.body;
  if (title === undefined) {
    return res.status(400).send({
      message: "Title is required",
    });
  }
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const post = await courseModel.create({
    title: title,
    author: author,
    publisher: publisher,
    description: description,
    price: price,
    user_id: user_id,
  });
  return res.send({
    message: "Success",
    data: post,
  });
};

const getAllData = async (req, res, _next) => {
  try {
    const { search, author, sort } = req.query;
    let conditions = {};
    if (author) {
      conditions.author = author;
    }

    if (search) {
      conditions.title = {
        [Op.like]: `%${search}%`,
      };
    }

    let orderClause = [["id", "ASC"]];
    if (sort) {
      const [field, direction] = sort.split(",");
      orderClause = [[field, direction ? direction.toUpperCase() : "ASC"]];
    }

    // Ambil data dari database berdasarkan kriteria di atas
    const getData = await courseModel.findAll({
      where: conditions,
      order: orderClause,
    });

    // Cek apakah datanya kosong
    if (getData.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    return res.send({
      message: "Success",
      totalData: getData.length,
      data: getData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get id
const getById = async (req, res, _next) => {
  const { id } = req.params;
  const byId = await courseModel.findByPk(id);

  if (!byId) {
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

  if (update[0] === 0) {
    return res
      .status(404)
      .json({ message: "Data tidak ditemukan atau tidak ada perubahan!" });
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
  const deleteId = await courseModel.destroy({ where: { id: id } });

  if (deleteId === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan!" });
  }

  return res.send({
    message: `Success: Data dengan ID ${id} berhasil dihapus.`,
  });
};

module.exports = { create, getAllData, getById, updateData, deleted };
