const bcrypt = require("bcrypt");
const db = require("../database/connect");

class User {
    constructor(user) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
        this.admin = user.admin;
        this.password = user.password;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }

    static async getAll() {
        const users = await db.query("SELECT * FROM users");
        if (users.rows.length === 0) {
            throw new Error("No users available");
        }
        return users.rows.map(u => new User(u))
    }

    static async show(id) {
        const user = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (user.rows.length !== 1) {
            throw new Error("No user found");
        }
        return new User(user.rows[0]);
    }

    static async validateUser(pass, email, username) {
        const response = await db.query("SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1", [email, username]);
        if (response.rows.length !== 1) {
            throw new Error("No user found");
        }
        
        const row = response.rows[0];

        const isValid = await bcrypt.compare(pass, row.password);

        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        const user = new User(res);

        delete user.password;
        return user;
    }

    static async create(data) {
        const { username, email, password } = data;
        if (!username || !email || !password ) {
            throw new Error("One of the required fields missing.");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length === 0) {
            let response = await db.query(`INSERT INTO users (username, email, password) 
                VALUES ($1, $2, $3) RETURNING *`, [username, email, hash]);
            return new User(response.rows[0]);
        }
        throw new Error("User already exist");
    }

    static async createAdmin(data) {
        const { username, email, admin, password } = data;
        if (!username || !email || !admin || !password ) {
            throw new Error("One of the required fields missing.");
        }

        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log("first", existingUser.rows)
        if (existingUser.rows.length === 0) {
            let response = await db.query(`INSERT INTO users (username, email, password, admin) 
                VALUES ($1, $2, $3, $4) RETURNING *`, [username, email, password, admin]);
            return new User(response.rows[0]);
        }
        throw new Error("User already exist");
    }


    async update(data) {
        for (const key of Object.keys(this)) {
            if (key in data && key !== "user_id") {
                this[key] = data[key];
            }
        }

        this.updated_at = new Date();

        const response = await db.query(`UPDATE users
                                            SET username = $1,
                                                email = $2,
                                                admin = $3,
                                                password = $4,
                                                updated_at = $5
                                            WHERE user_id = $6
                                            RETURNING *`, 
                                            [this.username, this.email, this.admin, this.password, this.updated_at, this.user_id]);


        if (response.rows[0]) {
            return new User(response.rows[0]);
        } else {
            throw new Error("Failed to update user");
        }
        
    }


    async destroy() {
        const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *;", [this.user_id]);
        return new User(response.rows[0]);
    }

};


module.exports = User;