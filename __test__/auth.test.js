const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

describe("POST Login", () => {
  let userData;

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
    await User.destroy({ where: { email: userData.email } });
  });

  it("should return 200 and access token when the user provides valid credentials", async () => {
    const res = await request(app)
      .post("/v1/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("access_token");
    expect(res.body).toHaveProperty("user");
  });

  it("should return 400 when email or password empty", async () => {
    const res = await request(app).post("/v1/auth/login").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 401 when the user does not exist", async () => {
    const res = await request(app)
      .post("/v1/auth/login")
      .send({ email: "nonexistent@example.com", password: "password123" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 401 when the password is incorrect", async () => {
    const res = await request(app)
      .post("/v1/auth/login")
      .send({ email: userData.email, password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST Register", () => {
  let userData;

  afterEach(async () => {
    await User.destroy({ where: { email: userData.email } });
  });

  it("should return 201 and create a new user", async () => {
    userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      role: "admin",
      phoneNumber: "1234567890",
    };

    const res = await request(app).post("/v1/auth/register").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 when fields are empty", async () => {
    const res = await request(app).post("/v1/auth/register").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
