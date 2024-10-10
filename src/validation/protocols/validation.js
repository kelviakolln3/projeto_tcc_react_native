class Validation {
    validate({ field, input }) {
      throw new Error("This method must be overridden");
    }
  }
  
  const ValidationError = {
    REQUIRED_FIELD: 'requiredField',
    INVALID_FIELD: 'invalidField',
    REQUIRED_LIST: 'requiredList',
    INVALID_LIST: 'invalidList',
  };
  
  export { Validation, ValidationError };