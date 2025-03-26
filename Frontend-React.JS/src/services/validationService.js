export const validateUser = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    password: (password) => {
        return password.length >= 6;
    },

    name: (name) => {
        return name.length >= 2;
    },

    address: (address) => {
        return address.length >= 5;
    },

    phoneNumber: (phone) => {
        return phone.length >= 10;
    },

    image: (file) => {
        if (!file) return true;
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        const isValidType = file.type.startsWith('image/');
        return isValidSize && isValidType;
    },

    validateForm: (formData, intl) => {
        const errors = {};

        if (!formData.email || !validateUser.email(formData.email)) {
            errors.email = intl.formatMessage({ id: "validate.email" });
        }
        if (!formData.password || !validateUser.password(formData.password)) {
            errors.password = intl.formatMessage({ id: "validate.password" });
        }
        if (!formData.firstname || !validateUser.name(formData.firstname)) {
            errors.firstname = intl.formatMessage({ id: "validate.firstName" });
        }
        if (!formData.lastname || !validateUser.name(formData.lastname)) {
            errors.lastname = intl.formatMessage({ id: "validate.lastName" });
        }
        if (!formData.address || !validateUser.address(formData.address)) {
            errors.address = intl.formatMessage({ id: "validate.address" });
        }
        if (!formData.phoneNumber || !validateUser.phoneNumber(formData.phoneNumber)) {
            errors.phoneNumber = intl.formatMessage({ id: "validate.phoneNumber" });
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}; 