import S3 from 'aws-sdk/clients/s3';
import { S3_AUDIO_BUCKET, S3_GPS_LOGS, S3_IMAGE_BUCKET, S3_URL_EXPIRATION_TIME } from '../types/constant';

export let s3: S3;

export const setUpS3 = async () => {
    s3 = new S3({apiVersion: '2006-03-01'});
};

export const getGPSLogs = async (logName): Promise<any> => {
    const params = {
        Bucket: S3_GPS_LOGS,
        Key: logName,
    };

    return new Promise((resolve, reject) => {
        s3.getObject(params, (error, data) => {
            if (error) {
                reject({error: error});
            }
            resolve(data);
        });
    });
};

export const uploadAudio = async (audioName, audio): Promise<any> => {
    const params = {
        Bucket: S3_AUDIO_BUCKET,
        Key: audioName,
        Body: audio
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (error, data) => {
            if (error) {
                reject({error: error});
            }
            resolve(data);
        });
    });
};

export const deleteAudio = async (audioName): Promise<any> => {
    const params = {
        Bucket: S3_AUDIO_BUCKET,
        Key: audioName,
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (error, data) => {
            if (error) {
                reject({error: error});
            }
            resolve(data);
        });
    });
};

export const uploadImage = async (imageName, audio): Promise<any> => {
    const params = {
        Bucket: S3_IMAGE_BUCKET,
        Key: imageName,
        Body: audio
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (error, data) => {
            if (error) {
                reject({error: error});
            }
            resolve(data);
        });
    });
};

export const deleteImage = async (imageName): Promise<any> => {
    const params = {
        Bucket: S3_IMAGE_BUCKET,
        Key: imageName,
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (error, data) => {
            if (error) {
                reject({error: error});
            }
            resolve(data);
        });
    });
};

export const getAudioUrl = async (imageName): Promise<any> => {
    const params = {
        Bucket: S3_AUDIO_BUCKET,
        Key: imageName,
        Expires: S3_URL_EXPIRATION_TIME // 6 days
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                reject({error: error});
            }
            resolve(url);
        });
    });
};

export const getImageUrl = async (imageName): Promise<any> => {
    const params = {
        Bucket: S3_IMAGE_BUCKET,
        Key: imageName,
        Expires: S3_URL_EXPIRATION_TIME // 6 days
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                reject({error: error});
            }
            resolve(url);
        });
    });
};
