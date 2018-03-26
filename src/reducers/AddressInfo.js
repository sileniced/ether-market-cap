export default (state = {}, { type, value }) => {

    switch (type) {
        case 'INFO_CONSTRUCT':
            return value;
        default:
            return state
    }
}