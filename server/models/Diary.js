const db = require("../database/connect");

class Diary {
    constructor(diary) {
        this.id = diary.id;
        this.entry_date = diary.entry_date;
        this.title = diary.title;
        this.content = diary.content;
        this.mood = diary.mood;
        this.tags = diary.tags;
        this.created_at = diary.created_at;
        this.updated_at = diary.updated_at;
    }
};



module.exports = Diary;