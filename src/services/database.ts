import mysql from 'mysql';

export let db: mysql.Pool;

export const setUpDatabase = async () => {
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT)
    });
};

export const getAllHikes = async (userId: number): Promise<any> => {
    const sql = 'SELECT * FROM hikes WHERE user_id = ?';
    const values = [userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const getAHike = async (userId: number, hikeId): Promise<any> => {
    const sql = 'SELECT * FROM hikes WHERE id = ? AND user_id = ?';
    const values = [hikeId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const deleteAHike = async (userId: number, hikeId): Promise<any> => {
    const sql = 'DELETE FROM hikes WHERE id = ? AND user_id = ?';
    const values = [hikeId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const favouriteAHike = async (userId: number, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET favourite = ? WHERE id = ? AND user_id = ?';
    const values = [value, hikeId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const updateNotes = async (userId: number, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET notes = ? WHERE id = ? AND user_id = ?';
    const values = [value, memoId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const updateTranscription = async (userId: number, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET transcription = ? WHERE id = ? AND user_id = ?';
    const values = [value, memoId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const updateAudioPointer = async (userId: number, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET audio = ? WHERE id = ? AND user_id = ?';
    const values = [value, memoId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const getAMemo = async (userId: number, memoId): Promise<any> => {
    const sql = 'SELECT memos WHERE id = ? AND user_id = ?';
    const values = [memoId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const getAllMemos = async (userId: number, hikeId): Promise<any> => {
    const sql = 'SELECT memos WHERE hike_id = ? AND user_id = ?';
    const values = [hikeId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};

export const updateImagePointer = async (userId: number, memoId, value): Promise<any> => {
    const sql = 'UPDATE memos SET image = ? WHERE id = ? AND user_id = ?';
    const values = [value, memoId, userId];
    const query = db.format(sql, values);

    return new Promise((resolve, reject) => {
        db.query(query, (result, error) => {
            if (error) {
                reject({error: error});
            }
            resolve(result);
        });
    });
};
