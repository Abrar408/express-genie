const fs = require("fs");
const path = require("path");
const pluralize = require("pluralize");

const capitalize = require("./capitalize");
const createOrUpdateFile = require("./createOrUpdateFile");
const createContent = require("./createContent");

const validations = ["create", "update"];
const routeStringToSearch = ['");', ");"];

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
    `${__dirname}/../template/validateRequestMiddleware.template.ejs`
  );
  const content2 = createContent(
    `${__dirname}/../template/reqLoggerMiddleware.template.ejs`
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
const createRoute = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/route.template.ejs`,
    entityName
  );
  createOrUpdateFile(`routes/${entityName}/${entityName}.routes.js`, content);
  console.log(`${entityName} routes created successfully.`);
};
const createController = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/controller.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `controllers/${entityName}/${entityName}.controller.js`,
    content
  );
  console.log(`${entityName} controllers created successfully.`);
};
const createService = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/service.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `services/${entityName}/${entityName}.service.js`,
    content
  );
  console.log(`${entityName} services created successfully.`);
};
const createValidation = (entityName) => {
  validations.forEach((validation) => {
    const content = createContent(
      `${__dirname}/../template/${validation}Validation.template.ejs`,
      entityName
    );
    createOrUpdateFile(
      `validations/${pluralize.plural(entityName)}/${validation}.validation.js`,
      content
    );
  });
  console.log(`${entityName} validations created successfully.`);
};
const updateApp = (entityName) => {
  const routeContentToAdd = [
    `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`,
    `\napp.use("/api/${entityName}", ${entityName}Routes);\n`,
  ];

  routeStringToSearch.forEach((string, index) => {
    const appJs = fs.readFileSync(`app.js`, "utf8");

    const lastIndex = appJs.lastIndexOf(string);

    const firstPart = appJs.substring(0, lastIndex) + string;
    const secondPart = appJs.substring(lastIndex + string.length);
    const additionalLine = routeContentToAdd[index];

    createOrUpdateFile(`app.js`, firstPart + additionalLine + secondPart);
  });
};
const updateConstants = (entityName) => {
  const appJs = fs.readFileSync("constants/responses.js", "utf8");
  const string = "{";
  const index = appJs.indexOf(string);

  const firstPart = appJs.substring(0, index) + string;
  const secondPart = appJs.substring(index + string.length);
  const additionalLine = `\n\t${entityName.toUpperCase()}_RESPONSES: {
    CREATE_SUCCESS: "${capitalize(entityName)} created successfully.",
    UPDATE_SUCCESS: "${capitalize(entityName)} updated successfully.",
    DELETE_SUCCESS: "${capitalize(entityName)} deleted successfully.",
    NOT_FOUND: "${capitalize(entityName)} not found."
\t},`;

  createOrUpdateFile(
    "constants/responses.js",
    firstPart + additionalLine + secondPart
  );
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
  createController,
  createRoute,
  createService,
  createValidation,
  updateApp,
  updateConstants,
  addScripts,
  addDependencies,
};
