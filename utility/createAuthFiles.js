const fs = require("fs");
const path = require("path");

const createOrUpdateFile = require("./createOrUpdateFile");
const createContent = require("./createContent");

const createAuthMiddleware = () => {
  const content = createContent(
    `${__dirname}/../template/middleware/verifyTokenMiddleware.template.ejs`
  );
  createOrUpdateFile("./middleware/verifyToken.middleware.js", content);
  console.log(`auth middleware created successfully.`);
};
const createAuthRoute = () => {
  const content = createContent(
    `${__dirname}/../template/routes/authRoute.template.ejs`
  );
  createOrUpdateFile(`routes/auth.routes.js`, content);
  console.log(`auth routes created successfully.`);
};
const createAuthController = () => {
  const content = createContent(
    `${__dirname}/../template/controllers/authController.template.ejs`
  );
  createOrUpdateFile(`controllers/auth.controllers.js`, content);
  console.log(`auth controllers created successfully.`);
};
const createAuthService = () => {
  const content = createContent(
    `${__dirname}/../template/services/authService.template.ejs`
  );
  createOrUpdateFile(`services/auth.services.js`, content);
  console.log(`auth services created successfully.`);
};
const createAuthValidation = () => {
  const content = createContent(
    `${__dirname}/../template/validations/authValidation.template.ejs`
  );
  createOrUpdateFile(`validations/auth.validations.js`, content);

  console.log(`auth validations created successfully.`);
};
const createAuthHelpers = () => {
  const content = createContent(
    `${__dirname}/../template/helpers/otpHelpers.template.ejs`
  );
  createOrUpdateFile(`helpers/otpHelpers.js`, content);

  console.log(`auth helpers created successfully.`);
};
const updateAuthApp = () => {
  const routeStringToSearch = ['");', ");"];
  const routeContentToAdd = [
    `\nconst authRoutes = require("./routes/auth.routes");`,
    `\napp.use("/api/auth", authRoutes);\n`,
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
const updateAuthConstants = () => {
  const appJs = fs.readFileSync("constants/responses.js", "utf8");
  const string = "{";
  const index = appJs.indexOf(string);

  const firstPart = appJs.substring(0, index) + string;
  const secondPart = appJs.substring(index + string.length);
  const additionalLine = `\n\tAUTH_RESPONSES: {
    SIGNUP_SUCCESS: "Signed up successfully.",
    LOGIN_SUCCESS: "Logged in successfully.",
\t},`;

  createOrUpdateFile(
    "constants/responses.js",
    firstPart + additionalLine + secondPart
  );
};
const addAuthDependencies = () => {
  const userPackageJsonPath = path.join(__dirname, "./../../../package.json");
  const userPackageJson = require(userPackageJsonPath);

  if (!userPackageJson.dependencies) {
    userPackageJson.dependencies = {};
  }

  userPackageJson.dependencies["jsonwebtoken"] = "^9.0.1";
  userPackageJson.dependencies["bcryptjs"] = "^2.4.3";

  fs.writeFileSync(
    userPackageJsonPath,
    JSON.stringify(userPackageJson, null, 2)
  );
};
module.exports = {
  createAuthMiddleware,
  createAuthController,
  createAuthRoute,
  createAuthService,
  createAuthValidation,
  createAuthHelpers,
  updateAuthApp,
  updateAuthConstants,
  addAuthDependencies,
};
