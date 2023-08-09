# ![Logo](https://github.com/Abrar408/express-genie/blob/main/assets/logo.png)

This is a Node.js module available through the npm registry.

If this is a brand new project, make sure to create a package.json first with the npm init command.

Installation is done using the npm install command:

```bash
  npm install express-genie --save-dev
```

After installing, run:

```bash
  npm run setup
```

After running this command you should see the following files created in root directory:

- server.js //_entry point for project_
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
    "setup": "node ./node_modules/express-genie/index.js",
    "dev": "set NODE_ENV=development&& nodemon server.js",
    "stage": "set NODE_ENV=staging&& nodemon server.js",
    "deploy": "node server.js"
  },
```

```bash
"dependencies": {
    "joi": "^17.9.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "mysql2": "^3.1.2"
  },
  "devDependencies": {
    "express-genie": "^1.3.0",
    "nodemon": "^2.0.22"
  }
```

Run npm install to install the dependencies

```bash
  npm install
```

Now you are good to go and have a basic express structure ready.
To create new records and all its necessities run npm run setup [entityName] _without square brackets_

```bash
  npm run setup [your entity name here]
```

Four new folders will be created:

- routes //_for route handling_
- controllers //_for handling response_
- services //_for business logic_
- validations //_incoming request validations_

and app.js file will be updated to include the new created route.

For every new route just run the previous command with replacing the entity name.
Enjoy!

## Authors

- [Syed Abrar Ali](https://github.com/Abrar408)
- [Jawad Shaikh](https://github.com/jawad-shaikh)

## Contributing

Contributions are always welcome!

Feel free to contact us if you find any bugs or have any suggestions

- abrar123789ali@gmail.com
- shaikhjawad314@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)
