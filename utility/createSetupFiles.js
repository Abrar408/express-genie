const fs = require("fs");
const path = require("path");

const createOrUpdateFile = require("./createOrUpdateFile");
const createContent = require("./createContent");

const createApp = () => {
  const content = createContent(`${__dirname}/../template/app.template.ejs`);
  createOrUpdateFile("./app.js", content);
  console.log(`app created successfully.`);
};
const createServer = () => {
  const content = createContent(`${__dirname}/../template/server.template.ejs`);
  createOrUpdateFile("./server.js", content);
  console.log(`server created successfully.`);
};
const createEnv = () => {
  const content = createContent(`${__dirname}/../template/env.template.ejs`);
  createOrUpdateFile("./.env", content);
  createOrUpdateFile("./.env.development", content);
  createOrUpdateFile("./.env.staging", content);
  console.log(`envs created successfully.`);
};
const createMiddleware = () => {
  const content1 = createContent(
    `${__dirname}/../template/middleware/validateRequestMiddleware.template.ejs`
  );
  const content2 = createContent(
    `${__dirname}/../template/middleware/reqLoggerMiddleware.template.ejs`
  );
  createOrUpdateFile("./middleware/validateRequest.middleware.js", content1);
  createOrUpdateFile("./middleware/reqLogger.middleware.js", content2);
  console.log(`middleware created successfully.`);
};
const createConfig = () => {
  const content = createContent(
    `${__dirname}/../template/dbConfig.template.ejs`
  );
  createOrUpdateFile("./config/db.config.js", content);
  console.log(`config created successfully.`);
};
const createConstants = () => {
  const content = createContent(
    `${__dirname}/../template/constant.template.ejs`
  );
  createOrUpdateFile("./constants/responses.js", content);
  console.log(`constants created successfully.`);
};
const addScripts = () => {
  const userPackageJsonPath = path.join(__dirname, "./../../../package.json");
  const userPackageJson = require(userPackageJsonPath);

  if (!userPackageJson.scripts) {
    userPackageJson.scripts = {};
  }
  delete userPackageJson.scripts["test"];
  userPackageJson.scripts["dev"] =
    "set NODE_ENV=development&& nodemon server.js";
  userPackageJson.scripts["stage"] = "set NODE_ENV=staging&& nodemon server.js";
  userPackageJson.scripts["deploy"] = "node server.js";

  fs.writeFileSync(
    userPackageJsonPath,
    JSON.stringify(userPackageJson, null, 2)
  );
};
const addDependencies = () => {
  const userPackageJsonPath = path.join(__dirname, "./../../../package.json");
  const userPackageJson = require(userPackageJsonPath);

  if (!userPackageJson.dependencies) {
    userPackageJson.dependencies = {};
  }

  if (!userPackageJson.devDependencies) {
    userPackageJson.devDependencies = {};
  }

  userPackageJson.dependencies["joi"] = "^17.9.1";
  userPackageJson.dependencies["express"] = "^4.18.2";
  userPackageJson.dependencies["cors"] = "^2.8.5";
  userPackageJson.dependencies["dotenv"] = "^16.0.3";
  userPackageJson.dependencies["mysql2"] = "^3.1.2";

  userPackageJson.devDependencies["nodemon"] = "^2.0.22";

  fs.writeFileSync(
    userPackageJsonPath,
    JSON.stringify(userPackageJson, null, 2)
  );
};

module.exports = {
  createApp,
  createServer,
  createEnv,
  createMiddleware,
  createConfig,
  createConstants,
  addScripts,
  addDependencies,
};
