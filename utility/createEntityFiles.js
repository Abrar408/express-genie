const fs = require("fs");
const pluralize = require("pluralize");

const capitalize = require("./capitalize");
const createOrUpdateFile = require("./createOrUpdateFile");
const createContent = require("./createContent");

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
const createRoute = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/routes/route.template.ejs`,
    entityName
  );
  createOrUpdateFile(`routes/${entityName}/${entityName}.routes.js`, content);
  console.log(`${entityName} routes created successfully.`);
};
const createController = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/controllers/controller.template.ejs`,
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
    `${__dirname}/../template/services/service.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `services/${entityName}/${entityName}.service.js`,
    content
  );
  console.log(`${entityName} services created successfully.`);
};
const createValidation = (entityName) => {
  const validations = ["create", "update"];
  validations.forEach((validation) => {
    const content = createContent(
      `${__dirname}/../template/validations/${validation}Validation.template.ejs`,
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
  const routeStringToSearch = ['");', ");"];
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

module.exports = {
  createMiddleware,
  createController,
  createRoute,
  createService,
  createValidation,
  updateApp,
  updateConstants,
};
