# E-Commerce Rest API - NodeJS

## Getting Started

`npm install` to install all required dependencies


## Folder Structure

- `config`- This folder contains mongodb connection and enviroment variables configuration.
- `controllers` - This folder controls api request and saving database.
- `routes` - This folder contains our API's routes.
- `models` - This folder contains database models.
- `middlewares` - This folder contains middlwares for our API.
- `helpers` - This folder contains npm packages.
- `logger` - This folder contains log information about our database models.
- `validations` - This folder checks our database models validations.
- `services` - This folder saves our models to database.


## Technologies

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Joi](https://mongoosejs.com/)
- [Winston](https://github.com/winstonjs/winston)
- [JWT](https://jwt.io/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [Nodemailer](https://nodemailer.com/about/)

## Enviroment Variables

- `PORT` - Server Port
- `MONGODB_URI` - MongoDB URI
- `SECRET` - Secret key for JWT
- `SMTP_HOST` - Email Host
- `SMTP_PORT` - Email Port
- `SMTP_EMAIL` - Email Address
- `SMTP_PASS` - Email Password
- `RESET_PASSWORD_EXPIRE` - Password expire
