const db = require("../database/connect");

class Diary {
    constructor(diary) {
        this.diary_id = diary.diary_id;
        this.entry_date = diary.entry_date;
        this.title = diary.title;
        this.content = diary.content;
        this.mood = diary.mood;
        this.tags = diary.tags;
        this.user_id = diary.user_id;
        this.created_at = diary.created_at;
        this.updated_at = diary.updated_at;
    }

    static async getAll() {
        const diaries = await db.query("SELECT * FROM diary");
        if (diaries.rows.length === 0) {
            throw new Error("No diaries available");
        }
        return diaries.rows.map(c => new Diary(c))
    }

    static async show(id) {
        const diary = await db.query("SELECT * FROM diary WHERE diary_id = $1", [id]);
        if (diary.rows.length !== 1) {
            throw new Error("No diary found");
        }
        return new Diary(diary.rows[0]);
    }

    static async create(data) {
        const { content, user_id } = data;
        if (!content || !user_id ) {
            throw new Error("One of the required fields missing.");
        }

        data.entry_date = new Date();
            
        // return diary;
        let response = await db.query(`INSERT INTO diary (entry_date, content, user_id, title, tags, mood) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [data.entry_date, content, user_id, data.title, data.tags, data.mood]);
            console.log("first")
        return new Diary(response.rows[0]);
    }

    async update(data) {
        for (const key of Object.keys(this)) {
            if (key in data && key !== "diary_id" && key !== "created_at" && key !== "updated_at" && key !== "user_id" && key !== "entry_date") {
                this[key] = data[key];
            }
        }


        this.updated_at = new Date();

        const response = await db.query(`UPDATE diary
                                            SET title = $1,
                                                content = $2,
                                                mood = $3,
                                                tags = $4
                                            WHERE diary_id = $5
                                            RETURNING *`, 
                                            [this.title, this.content, this.mood, this.tags, this.diary_id]);


        if (response.rows[0]) {
            return new Diary(response.rows[0]);
        } else {
            throw new Error("Failed to update diary");
        }
        
    }


    async destroy() {
        const response = await db.query("DELETE FROM diary WHERE diary_id = $1 RETURNING *;", [this.diary_id]);
        return new Diary(response.rows[0]);
    }
};



module.exports = Diary;