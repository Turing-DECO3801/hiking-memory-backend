import mysql from 'mysql';

export let db: mysql.Pool;

export const setUpDatabase = async () => {
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        connectionLimit: 10
    });
};

export const getAllHikes = async (email: string): Promise<any> => {
    const sql = 'SELECT * FROM hikes WHERE email = ?';
    const values = [email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const getAHike = async (email: string, hikeId): Promise<any> => {
    const sql = 'SELECT * FROM hikes WHERE id = ? AND email = ?';
    const values = [hikeId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const deleteAHike = async (email: string, hikeId): Promise<any> => {
    const sql = 'DELETE FROM hikes WHERE id = ? AND email = ?';
    const values = [hikeId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const favouriteAHike = async (email: string, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET favourite = ? WHERE id = ? AND email = ?';
    const values = [value, hikeId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateNotes = async (email: string, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET notes = ? WHERE id = ? AND email = ?';
    const values = [value, memoId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateTranscription = async (email: string, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET transcription = ? WHERE id = ? AND email = ?';
    const values = [value, memoId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateAudioPointer = async (email: string, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET audio = ? WHERE id = ? AND email = ?';
    const values = [value, memoId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const getAMemo = async (email: string, memoId): Promise<any> => {
    const sql = 'SELECT memos WHERE id = ? AND email = ?';
    const values = [memoId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const getAllMemos = async (email: string, hikeId): Promise<any> => {
    const sql = 'SELECT memos WHERE hike_id = ? AND email = ?';
    const values = [hikeId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateImagePointer = async (email: string, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET image = ? WHERE id = ? AND email = ?';
    const values = [value, memoId, email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const checkEmailExist = async (email): Promise<any> => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const addNewUser = async (email, password, name): Promise<any> => {
    const sql = 'INSERT INTO users(email, password, name, insertion_time)';
    const values = [email, password, name, 'NOW()'];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};

export const getUser = async (email, password): Promise<any> => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject({ error: error });
            }
            resolve(result);
        });
    });
};
