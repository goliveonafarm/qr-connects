const capitalizeFirstLetterOfString = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalizeFirstLetterOfString;