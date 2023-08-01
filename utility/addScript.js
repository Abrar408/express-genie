const fs = require("fs");
const path = require("path");
const userPackageJsonPath = path.join(__dirname, "./../../package.json");
const userPackageJson = require(userPackageJsonPath);

// Modify the user's package.json here
if (!userPackageJson.scripts) {
  userPackageJson.scripts = {};
}

userPackageJson.scripts["setup"] = "node ./node_modules/express-setup/index.js";

// Write the modified package.json back to the user's file system
fs.writeFileSync(userPackageJsonPath, JSON.stringify(userPackageJson, null, 2));
