# 10xers-tech-task
Backend Repository for 10xers tech task, for API Documentation please check API_Documentation.md

## Feature :
- Login
- Register
- Get All Product
- Get Product by ID
- Add Product
- Edit Product by ID
- Delete Product by ID 
- Authentication and Authorization (Only Login User with Admin Role can Access CRUD)
- Unit Test

## Package :
- Express
- Sequelize
- Postgres
- JWT
- Bcryptjs
- Jest
- Supertest

## Run the Project
1. npm install
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npm start

## Run unit Test
1. command this line in app.js
```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
2. npx sequelize-cli db:create --env=test
3. npx sequelize-cli db:migrate --env=test
4. npm test

Thank You


