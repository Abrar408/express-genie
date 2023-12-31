const {
  createApp,
  createServer,
  createEnv,
  createMiddleware,
  createConfig,
  createConstants,
  addScripts,
  addDependencies,
} = require("./utility/createSetupFiles");

const {
  createRoute,
  createController,
  createService,
  createValidation,
  updateApp,
  updateConstants,
} = require("./utility/createEntityFiles");

const {
  createAuthRoute,
  createAuthMiddleware,
  createAuthController,
  createAuthValidation,
  createAuthService,
  updateAuthApp,
  updateAuthConstants,
  addAuthDependencies,
  createAuthHelpers,
} = require("./utility/createAuthFiles");

const checkFileExists = require("./utility/checkFileExists");

const entityName = process.argv[2];

if (!entityName) {
  if (!checkFileExists("./app.js")) createApp();
  if (!checkFileExists("./server.js")) createServer();
  if (!checkFileExists("./.env")) createEnv();
  if (!checkFileExists("./middleware")) createMiddleware();
  if (!checkFileExists("./config")) createConfig();
  if (!checkFileExists("./constants")) createConstants();

  addScripts();
  addDependencies();
} else if (entityName === "auth") {
  createAuthRoute();
  createAuthMiddleware();
  createAuthValidation();
  createAuthController();
  createAuthService();
  createAuthHelpers();

  updateAuthApp();
  updateAuthConstants();

  addAuthDependencies();
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
