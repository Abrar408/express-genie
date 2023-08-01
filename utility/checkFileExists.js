const fs = require("fs");
const checkFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(filePath, "file does not exist. Run npm run setup first");
    return false;
  } else {
    return true;
  }
};

module.exports = checkFileExists;
