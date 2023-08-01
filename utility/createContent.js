const fs = require("fs");
const ejs = require("ejs");
const pluralize = require("pluralize");

const capitalize = require("./capitalize");

const createContent = (filePath, entityName) => {
  const appStarterTemplate = fs.readFileSync(filePath, "utf8");
  return ejs.render(appStarterTemplate, {
    entityName,
    capitalize,
    plural: pluralize.plural,
  });
};

module.exports = createContent;
