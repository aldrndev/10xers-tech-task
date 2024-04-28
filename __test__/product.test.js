const request = require("supertest");
const app = require("../app");
const { Product, User } = require("../models");

describe("GET /v1/product", () => {
  beforeEach(async () => {
    await Product.bulkCreate([
      {
        name: "Product 1",
        description: "product 1",
        price: 100,
        stock: 10,
        brand: "Brand 1",
      },
      {
        name: "Product 2",
        description: "product 2",
        price: 200,
        stock: 10,
        brand: "Brand 2",
      },
      {
        name: "Product 3",
        description: "product 3",
        price: 300,
        stock: 5,
        brand: "Brand 1",
      },
    ]);

    userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
    };
    await User.create(userData);
  });

  afterEach(async () => {
    await Product.destroy({ truncate: true });
    await User.destroy({ where: { email: userData.email } });
  });

  it("No filter, no search, no sort", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .get("/v1/product/get")
      .set("access_token", resLogin.body.access_token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.length).toBe(3);
  });

  it("Filter by brand, no search, no sort", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .get("/v1/product/get?filter=Brand%201")
      .set("access_token", resLogin.body.access_token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.length).toBe(2);
  });

  it("No filter, search by name, no sort", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .get("/v1/product/get?search=Product%202")
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.length).toBe(1);
  });

  it("No filter, no search, sort by highest price", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .get("/v1/product/get?sort=highest")
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.length).toBe(3);
  });

  it("No filter, no search, sort by lowest price", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .get("/v1/product/get?sort=lowest")
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.length).toBe(3);
  });
});

describe("POST /v1/product/add", () => {
  let productData;

  beforeEach(async () => {
    userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
    };
    await User.create(userData);
  });

  afterEach(async () => {
    await Product.destroy({ where: { name: productData.name } });
    await User.destroy({ where: { email: userData.email } });
  });

  it("should return 201 and create a new product", async () => {
    productData = {
      name: "Iphone 15",
      description: "New Iphone 15",
      price: 100,
      stock: 5,
      brand: "Apple",
    };

    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .post("/v1/product/add")
      .send(productData)
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
  });

  it("should return 400 when fields are empty", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .post("/v1/product/add")
      .send({})
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("PUT /v1/product/edit", () => {
  let createProduct;
  beforeEach(async () => {
    createProduct = await Product.create({
      name: "Product 1",
      description: "product 1",
      price: 100,
      stock: 10,
      brand: "Brand 1",
    });

    await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
    });
  });

  afterEach(async () => {
    await Product.destroy({ where: { name: "Product 1" } });
    await User.destroy({ where: { email: "john@example.com" } });
  });

  it("should return 200 and update product", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(resLogin.statusCode).toBe(200);

    const res = await request(app)
      .put(`/v1/product/edit/${createProduct.id}`)
      .send({ name: "Product 1", price: 200 })
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /v1/product/delete", () => {
  let createProduct;
  beforeEach(async () => {
    createProduct = await Product.create({
      name: "Product 1",
      description: "product 1",
      price: 100,
      stock: 10,
      brand: "Brand 1",
    });

    await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
    });
  });

  afterEach(async () => {
    await Product.destroy({ where: { name: "Product 1" } });
    await User.destroy({ where: { email: "john@example.com" } });
  });

  it("should return 200 and delete product", async () => {
    const resLogin = await request(app).post("/v1/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });
    expect(resLogin.statusCode).toBe(200);
    const res = await request(app)
      .delete(`/v1/product/delete/${createProduct.id}`)
      .set("access_token", resLogin.body.access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
