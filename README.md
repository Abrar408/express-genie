# express-genie

This is a Node.js module available through the npm registry.

If this is a brand new project, make sure to create a package.json first with the npm init command.

Installation is done using the npm install command:

```bash
  npm install express-genie
```

After installing express-genie run:

```bash
  npm run setup
```
After running this command you should see the following files created in root directory:

- server.js
- app.js
- .env
- .env.development
- .env.staging

and folders:

- config
- middleware
- constants

also your package.json file will also be updated to include scripts and dependencies and will look like:


```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "setup": "node ./node_modules/express-genie/index.js",
    "dev": "set NODE_ENV=development&& nodemon server.js",
    "stage": "set NODE_ENV=staging&& nodemon server.js",
    "deploy": "node server.js"
  },
```

```bash
"dependencies": {
    "express-genie": "^1.3.0",
    "joi": "^17.9.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "mysql2": "^3.1.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```
Run npm install to install the dependencies 

```bash
  npm install
```

Now you are good to go and have a basic express structure ready.
To create new records and all its necessaties run npm run setup [entityName] *without square brackets*

```bash
  npm run setup [your entity name here]
```

Four new folders will be created:

- routes
- controllers
- services
- validations

and app.js file will be updated to include the new created route.

For every new route just run the previous command with replacing the entity name.
Enjoy!

# License
[MIT](https://github.com/expressjs/express/blob/HEAD/LICENSE)

# People
- [Syed Abrar Ali](https://github.com/Abrar408)
- [Jawad Shaikh](https://github.com/jawad-shaikh)
