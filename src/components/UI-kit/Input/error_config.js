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
    },
    email: {
        code: 401,
        reg:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        msg: 'Please enter a valid email address',
        tip: 'Please enter a valid email address'
    },
    url: {
        code: 401,
        reg:/(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
        msg: 'Please enter a valid address',
        tip: 'Please enter a valid address'
    }
}