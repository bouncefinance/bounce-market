export const ErrorStatus = {
    required: {
        code: 401,
        msg: 'This is a required field, but returns a null value',
        tip: 'This field is required and cannot be blank'
    },
    regular: {
        code: 401,
        msg: 'Does not conform to the passed regular expression standard',
        tip: 'This is not in conformity with the standard, please fill in again'
    }
}