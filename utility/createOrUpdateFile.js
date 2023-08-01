const fs = require("fs");
const path = require("path");

const createOrUpdateFile = (filePath, content) => {
    const folderPath = path.dirname(filePath);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
}

module.exports = createOrUpdateFile;