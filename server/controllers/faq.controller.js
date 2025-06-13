const { faq } = require('../models'); // pastikan path models sesuai struktur proyekmu

// GET /fetch-data-faq
const fetchData = async (req, res) => {
  try {
    const data = await faq.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Error fetching FAQ:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data FAQ.' });
  }
};

// POST /add-data-faq
const addData = async (req, res) => {
  try {
    const { pertanyaan, answer } = req.body || {};

    if (!pertanyaan || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Pertanyaan dan jawaban wajib diisi.'
      });
    }

    const newFaq = await faq.create({ pertanyaan, answer });

    res.status(201).json({
      success: true,
      message: 'FAQ berhasil ditambahkan.',
      data: newFaq
    });
  } catch (err) {
    console.error('Error adding FAQ:', err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan FAQ.' });
  }
};
// DELETE /delete-faq 
const deleteData = async (req, res) => {
  try {
    const { id } = req.params; // Ambil dari URL params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID wajib disertakan.',
      });
    }

    const target = await faq.findByPk(id);
    if (!target) {
      return res.status(404).json({
        success: false,
        message: 'FAQ tidak ditemukan.',
      });
    }

    await target.destroy();

    res.status(200).json({
      success: true,
      message: 'FAQ berhasil dihapus.',
    });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus FAQ.' });
  }
};

// PUT /update-faq 
const updateData = async (req, res) => {
  try {
    const { id, pertanyaan, answer } = req.body || {};

    if (!id || !pertanyaan || !answer) {
      return res.status(400).json({
        success: false,
        message: 'ID, pertanyaan, dan jawaban wajib diisi.',
      });
    }

    const target = await faq.findByPk(id);
    if (!target) {
      return res.status(404).json({
        success: false,
        message: 'FAQ tidak ditemukan.',
      });
    }

    await target.update({ pertanyaan, answer });

    res.status(200).json({
      success: true,
      message: 'FAQ berhasil diperbarui.',
      data: target,
    });
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui FAQ.' });
  }
};


module.exports = {
  fetchData,
  addData,
  deleteData,
  updateData,
};
