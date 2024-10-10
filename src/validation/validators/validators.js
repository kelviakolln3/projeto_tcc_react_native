import { ValidationError } from '../protocols/validation';

export class RequiredFieldValidation {
    constructor(field) {
        this.field = field;
    }

    validate(input) {
        return input[this.field] && input[this.field].trim().length > 0 ? null : ValidationError.REQUIRED_FIELD;
    }
}

export class MinLengthValidation {
    constructor(field, size) {
        this.field = field;
        this.size = size;
    }

    validate(input) {
        return input[this.field] && input[this.field].length >= this.size ? null : ValidationError.INVALID_FIELD;
    }
}

export class CpfValidation {
    constructor(field) {
        this.field = field;
    }

    validate(input) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const isValid = !input[field] || regex.test(input[field]);
        return isValid ? null : ValidationError.INVALID_FIELD;
    }
}

export class DateValidation {
    constructor(field) {
        this.field = field;
    }

    validate(input) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const isValid = !input[field] || regex.test(input[field]);
        return isValid ? null : ValidationError.INVALID_FIELD;
    }
}

export class PhoneValidation {
    constructor(field) {
        this.field = field;
    }

    validate(input) {
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        const isValid = !input[field] || regex.test(input[field]);
        return isValid ? null : ValidationError.INVALID_FIELD;
    }
}

export class EmailValidation {
    constructor(field) {
        this.field = field;
    }

    validate(input) {
        const regex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
        const isValid = !input[field] || regex.test(input[field]);
        return isValid ? null : ValidationError.INVALID_FIELD;
    }
}

export class NestedValidation {
    constructor(field, validations) {
        this.field = field;
        this.validations = validations;
    }

    validate(input) {
        const list = input[this.field];

        if (!Array.isArray(list)) {
            return ValidationError.REQUIRED_LIST;
        }

        for (const item of list) {
            const result = this._validateItem(item);
            if (result) {
                return result; 
            }
        }
        return null; 
    }

    _validateItem(item) {
        for (const validation of this.validations) {
            const result = validation.validate(item);
            if (result) {
                return ValidationError.REQUIRED_FIELD; 
            }
        }
        return null;
    }
}