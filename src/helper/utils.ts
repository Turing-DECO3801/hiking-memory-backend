import validator from 'validator';

/** Validate email's format */
export const validateEmail = (email) => {
    return validator.isEmail(email);
};
