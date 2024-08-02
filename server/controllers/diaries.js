const Diary = require("../models/Diary");


async function index(req, res) {
    try {
        const diaries = await Diary.getAll();
        res.status(200).json(diaries);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

async function show(req, res) {
  try {
      const id = req.params.id;
      const diary = await Diary.show(parseInt(id));
      res.status(200).json(diary);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newDiary = await Diary.create(data);
        res.status(201).send(newDiary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const diary = await Diary.show(parseInt(id));
        console.log("first", diary)
        const result = await diary.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const diary = await Diary.show(parseInt(id));
        await diary.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}