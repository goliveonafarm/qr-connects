function convertToBool(boolString) {
    if (!boolString) return false;
    if (boolString === "true") return true;
    if (boolString === "false") return false;
    return false;
  }

  export default convertToBool;