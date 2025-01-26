<h1 align="center" id="title">Phoenix IMF API Challenge</h1>

<p align="center"><img src="https://socialify.git.ci/tejesh856/Phoenix-IMF-Gadget/image?custom_description=Phoenix+IMF+Gadget+API+is+a+Node.js+backend+for+managing+gadgets+and+missions%2C+featuring+authentication%2C+PostgreSQL+with+Sequelize&amp;description=1&amp;font=Raleway&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;theme=Dark" alt="project-image"></p>

<p id="description">Your project Phoenix IMF Gadget API is a Node.js and Express-based backend API that manages gadgets with authentication and validation features. It uses PostgreSQL with Sequelize for database interactions and supports secure authentication via JWT and bcrypt.js. The API allows users to fetch create and manage gadgets incorporating a randomly generated Mission Success Probability for each gadget. It is deployed on Vercel ensuring a scalable and serverless environment with SSL-secured database connections. 🚀</p>

<h2>🚀 Demo</h2>

[https://phoenix-imf-gadget.vercel.app/](https://phoenix-imf-gadget.vercel.app/)

<h2>🧐 Features</h2>

Here're some of the project's best features:

- 🔐 User Authentication: Secure login and registration using JWT tokens and bcrypt.js for password hashing.
- 🛠️ Gadget Management: CRUD operations (Create Read Update Delete) for gadgets.
- 📊 Mission Success Probability: Each gadget has a randomly generated "mission success probability" percentage (e.g. "The Nightingale - 87%").
- 🔍 Gadget Retrieval: Get all gadgets or filter by status (e.g. "Active" "Decommissioned").
- ❌ Gadget Decommissioning: Decommission gadgets and track their status with a decommission timestamp.
- ✅ Validation & Error Handling: Input validation using express-validator and structured error responses.
- 💾 PostgreSQL Database: Use of PostgreSQL database with Sequelize ORM for efficient data management.
- 🔒 Secure Database Connection: SSL-secured database connections for production environment.
- 🛡️ Data Protection: Ensures that users can only manage gadgets they created.
- 🚀 Serverless Deployment: Deployed on Vercel providing serverless and scalable backend infrastructure.
- ⚙️ Seamless Development Experience: Development using nodemon for automatic server restarts and dotenv for environment management.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/tejesh856/Phoenix-IMF-Gadget
```

<p>2. Go into the project directory</p>

```
cd Phoenix- IMF Gadget API Development Challenge
```

<p>3. Install all the required dependencies using npm or yarn</p>

```
npm install or yarn install
```

<p>4. Create a .env in project source directory</p>

<p>5. add database connection and server parameters</p>

```
NODE_ENV=development
PORT=6000
DB_USERNAME
DB_PASSWORD
DB_DATABASE=imf_gadgets
DB_HOST
DB_PORT
```

<p>6. Create a database imf_gadgets</p>

```
npx sequelize-cli db:create
```

<p>7. Run the migrations to create the necessary tables:</p>

```
npx sequelize-cli db:migrate
```

<p>8. To start the server</p>

```
npm start
```

<h2>💻 Built with</h2>

Technologies used in the project:

- Node.js
- Javascript
- Postgres
