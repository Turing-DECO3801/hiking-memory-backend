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

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const getAHike = async (email: string, hikeId): Promise<any> => {
    const sql = 'SELECT * FROM hikes WHERE id = ? AND email = ?';
    const values = [hikeId, email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const deleteAHike = async (email: string, hikeId): Promise<any> => {
    const sql = 'DELETE FROM hikes WHERE id = ? AND email = ?';
    const values = [hikeId, email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const favouriteAHike = async (email: string, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET favourite = ? WHERE id = ? AND email = ?';
    const values = [value, hikeId, email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateHikeName = async (email: string, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET path_name = ? WHERE id = ? AND email = ?';
    const values = [value, hikeId, email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateNotes = async ( memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET notes = ? WHERE id = ?';
    const values = [value, memoId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateTranscription = async (memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET transcription = ? WHERE id = ?';
    const values = [value, memoId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const updateAudioPointer = async ( memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET audio = ? WHERE id = ?';
    const values = [value, memoId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const getAMemo = async (memoId): Promise<any> => {
    const sql = 'SELECT * FROM memos WHERE id = ?';
    const values = [memoId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const getAllMemosForHike = async (hikeId): Promise<any> => {
    const sql = 'SELECT * FROM memos WHERE hike_id = ?';
    const values = [hikeId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const updateImagePointer = async (memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET image = ? WHERE id = ?';
    const values = [value, memoId];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const checkEmailExist = async (email): Promise<any> => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const addNewUser = async (email, password, name): Promise<any> => {
    const sql = 'INSERT INTO users(email, password, name, insertion_time) VALUES(?, ?, ?, ?)';
    const values = [email, password, name, 'NOW()'];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(result);
        });
    });
};

export const getUser = async (email, password): Promise<any> => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

export const getAllHikePathWithImageForUser = async (email: string): Promise<any> => {
    const sql = `
        SELECT hikes.path_name, memos.image
        FROM hikes
        INNER JOIN memos
        ON hikes.id = memos.hike_id AND hikes.email = ?
    `;
    const values = [email];

    return new Promise((resolve) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                resolve({ error: error });
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};
