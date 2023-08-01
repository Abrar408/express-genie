const {
  createApp,
  createServer,
  createEnv,
  createMiddleware,
  createRoute,
  createController,
  createService,
  createValidation,
  updateApp,
  createConstants,
  updateConstants,
} = require("./utility/createFiles");

const checkFileExists = require("./utility/checkFileExists");

const entityName = process.argv[2];

if (!entityName) {
  createApp();
  createServer();
  createEnv();
  createMiddleware();
  createConstants();
} else {
  if (!checkFileExists("./app.js")) return;

  createRoute(entityName);
  createController(entityName);
  createService(entityName);
  createValidation(entityName);

  updateApp(entityName);
  updateConstants(entityName);
}

console.log(`All done.`);
