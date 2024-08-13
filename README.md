# Project Name: User Management REST API

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description
This project is a REST API for user management, developed using NestJS and Typescript. The API includes functionalities for user authentication and authorization using JWT, password encryption with Bcrypt, and data validation with class-validator. Administrators have the ability to create, edit, and delete users, while regular users can view and update their own information.

## Features
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Password Encryption**: Passwords are securely stored using Bcrypt.
- **User Management**:
  - **Administrators**: Create, edit, and delete user accounts.
  - **Regular Users**: View their own information and update their name, email, or password.
- **Data Validation**: Input validation using class-validator to ensure data integrity.
- **Database Integration**: MySQL database integration using TypeORM.

## Technologies Used
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) that supports MySQL and other databases.
- **class-validator**: A library for validation in TypeScript.
- **MySQL**: A relational database management system.
- **Bcrypt**: A library to help you hash passwords.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
2. Install the dependencies:
   ```bash
   pnpm install # or npm install depending on package manager
   ```
3. Configure the environment variables. Create a .env file in the root directory and add the following variables:
   ```env
   MYSQL_USER=your-database-user
   MYSQL_PASSWORD=your-database-password
   JWT_SECRET=your-jwt-secret
   SALT=number-of-rounds-to-generate-salt
   ```
4. Start the application:
   ```bash
   pnpm start # or pnpm start:dev to start on watch mode
   ```
## Usage
Once the application is running, you can interact with the API using tools like Postman or cURL. You will need to obtain a JWT token through the login endpoint to access protected routes.

## API Endpoints
### Authentication
- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Log in and obtain a JWT token.

### Users (Admin)
- **POST /users**: Create a new user.
- **GET /users**: Get a list of all users. Optional query param: search (search by name, surname, email and password).
- **GET /users/:id**: Get details of a specific user.
- **GET /users/:id/info**: Get details of current user (auth token must be for same user as id).
- **GET /users/country/:country**: Get a list of all users from country.
- **PATCH /users/:id**: Update a specific user's information.
- **PATCH /me/:id**: Update the authenticated user's password.
- **DELETE /users/:id**: Delete a specific user.

### Users (Regular)
- **GET /users/:id/info**: Get details of current authenticated user.
- **PATCH /me/:id**: Update the authenticated user's password.

## Wireframe

[Figma File](https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FmbtqNXlzHirdr2G2JJjt27%2FWireframe%3Fnode-id%3D2-2%26t%3DcLc3Qb2kxMgmFHiw-1%26scaling%3Dmin-zoom%26content-scaling%3Dfixed%26page-id%3D0%253A1)

![Desktop Admin View 1](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/desktop-admin1.png)
![Desktop Admin View 2](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/desktop-admin2.png)
![Desktop User View 1](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/desktop-user1.png)
![Desktop User View 2](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/desktop-user2.png)
![Mobile Admin View](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/mobile-admin.png)
![Mobile User View](https://raw.githubusercontent.com/alkemyTech/CENCO-MIT-Back-T2/main/src/assets/img/mobile-user.png)

## Contributing
We welcome contributions from the community. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
