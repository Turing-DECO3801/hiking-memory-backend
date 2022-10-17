import mysql from 'mysql';

export let db: mysql.Pool;

/**
 * Establish database connection
 */
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

/**
 * Get all hikes for user
 * @param email User's email
 * @returns All hikes
 */
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

/**
 * Get a hike
 * @param email User's email
 * @param hikeId Hike id
 * @returns A hike
 */
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

/**
 * Delete a hike
 * @param email User's email
 * @param hikeId Hike id
 * @returns Deleted hike
 */
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

/**
 * Update a hike's favourite status
 * @param email User's email
 * @param hikeId Hike id
 * @param value Update to
 * @returns Updated hike
 */
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

/**
 * Update hike viewed status
 * @param email User's email
 * @param hikeId Hike id
 * @param value Update to
 * @returns Updated hike
 */
export const updateHikeViewedStatus = async (email: string, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET viewed = ? WHERE id = ? AND email = ?';
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

/**
 * Update hike's distance
 * @param email User's email
 * @param hikeId Hike id
 * @param value Update to
 * @returns Updated hike
 */
export const updateHikeDistance = async (email: string, hikeId, value): Promise<any> => {
    const sql = 'UPDATE hikes SET distance = ? WHERE id = ? AND email = ?';
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

/**
 * Update hike's name
 * @param email User's email
 * @param hikeId Hike id
 * @param value Update to
 * @returns Updated hike
 */
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

/**
 * Update memo's notes
 * @param memoId Memo id
 * @param value Update to
 * @returns Updated memo
 */
export const updateNotes = async (memoId, value): Promise<any> => {
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

/**
 * Update memo's transcription
 * @param memoId Memo id
 * @param value Update to
 * @returns Updated memo
 */
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

/**
 * Update memo's audio pointer
 * @param memoId Memo id
 * @param value Update to
 * @returns Updated memo
 */
export const updateAudioPointer = async (memoId, value): Promise<any> => {
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

/**
 * Get a memo
 * @param memoId Memo id
 * @returns Memo
 */
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

/**
 * Get all memos for a hike
 * @param hikeId Hike id
 * @returns All memos
 */
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

/**
 * Update memo's image pointer
 * @param memoId Memo id
 * @param value Update to
 * @returns Updated memo
 */
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

/**
 * Check if user exists
 * @param email User's email
 * @returns User
 */
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

/**
 * Add new user
 * @param email User's email
 * @param password User's password
 * @param name User's name
 * @returns User
 */
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

/**
 * Get a user
 * @param email User's email
 * @param password User's password
 * @returns User
 */
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

/**
 * Get all hike paths with image
 * @param email User's email
 * @returns All hike paths
 */
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
