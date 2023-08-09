const fs = require("fs");
const pluralize = require("pluralize");

const capitalize = require("./capitalize");
const createOrUpdateFile = require("./createOrUpdateFile");
const createContent = require("./createContent");

const createRoute = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/routes/entityRoute.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `routes/${pluralize.plural(entityName)}.routes.js`,
    content
  );
  console.log(`${entityName} routes created successfully.`);
};
const createController = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/controllers/entityController.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `controllers/${pluralize.plural(entityName)}.controllers.js`,
    content
  );
  console.log(`${entityName} controllers created successfully.`);
};
const createService = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/services/entityService.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `services/${pluralize.plural(entityName)}.services.js`,
    content
  );
  console.log(`${entityName} services created successfully.`);
};
const createValidation = (entityName) => {
  const content = createContent(
    `${__dirname}/../template/validations/entityValidation.template.ejs`,
    entityName
  );
  createOrUpdateFile(
    `validations/${pluralize.plural(entityName)}.validations.js`,
    content
  );
  console.log(`${entityName} validations created successfully.`);
};
const updateApp = (entityName) => {
  const routeStringToSearch = ['");', ");"];
  const routeContentToAdd = [
    `\nconst ${entityName}Routes = require("./routes/${pluralize.plural(
      entityName
    )}.routes");`,
    `\napp.use("/api/${pluralize.plural(entityName)}", ${entityName}Routes);\n`,
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
  createController,
  createRoute,
  createService,
  createValidation,
  updateApp,
  updateConstants,
};
