import S3 from 'aws-sdk/clients/s3';
import { S3_AUDIO_FOLDER, S3_GPS_LOGS_FOLDER, S3_IMAGE_FOLDER, S3_URL_EXPIRATION_TIME } from '../types/constant';

export let s3: S3;

/**
 * Establish connection to S3
 */
export const setUpS3 = async () => {
    s3 = new S3({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });
};

/**
 * Get GPS logs
 * @param logName File name
 * @returns GPS logs
 */
export const getGPSLogs = async (logName): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_GPS_LOGS_FOLDER + logName
    };

    return new Promise((resolve) => {
        s3.getObject(params, (error, data) => {
            if (error) {
                resolve({error: error});
            }
            resolve(data);
        });
    });
};

/**
 * Upload audio
 * @param audioName File name
 * @param audio To upload
 * @returns success or failure
 */
export const uploadAudio = async (audioName, audio): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_AUDIO_FOLDER + audioName,
        Body: audio
    };

    return new Promise((resolve) => {
        s3.upload(params, (error, data) => {
            if (error) {
                resolve({error: error});
            }
            resolve(data);
        });
    });
};

/**
 * Delete audio file
 * @param audioName File name
 * @returns Success or failure
 */
export const deleteAudio = async (audioName): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_AUDIO_FOLDER + audioName,
    };

    return new Promise((resolve) => {
        s3.deleteObject(params, (error, data) => {
            if (error) {
                resolve({error: error});
            }
            resolve(data);
        });
    });
};

/**
 * Upload image
 * @param imageName File name
 * @param image To upload
 * @returns success or failure
 */
export const uploadImage = async (imageName, image): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_IMAGE_FOLDER + imageName,
        Body: image
    };

    return new Promise((resolve) => {
        s3.upload(params, (error, data) => {
            if (error) {
                resolve({error: error});
            }
            resolve(data);
        });
    });
};

/**
 * Delete image file
 * @param imageName File name
 * @returns Success or failure
 */
export const deleteImage = async (imageName): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_IMAGE_FOLDER + imageName,
    };

    return new Promise((resolve) => {
        s3.deleteObject(params, (error, data) => {
            if (error) {
                resolve({error: error});
            }
            resolve(data);
        });
    });
};

/**
 * Generate presigned URL for audio file
 * @param audioName File name
 * @returns Presigned URL
 */
export const getAudioUrl = async (audioName): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_AUDIO_FOLDER + audioName,
        Expires: S3_URL_EXPIRATION_TIME
    };

    return new Promise((resolve) => {
        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                resolve({error: error});
            }
            resolve(url);
        });
    });
};

/**
 * Generate presigned URL for image file
 * @param imageName File name
 * @returns Presigned URL
 */
export const getImageUrl = async (imageName): Promise<any> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: S3_IMAGE_FOLDER + imageName,
        Expires: S3_URL_EXPIRATION_TIME // 6 days
    };

    return new Promise((resolve) => {
        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                resolve({error: error});
            }
            resolve(url);
        });
    });
};
