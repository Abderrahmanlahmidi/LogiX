import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import User from "../../models/User.js";
import Role from "../../models/Role.js";
import { setupDB } from "../settings/setup.js";

describe("User Routes", () => {
  let id;

  setupDB();

  before(async () => {
    await Role.create({ name: "Driver", description: "Driver role" });
  });

  it("POST /register → should register a new user", async () => {
    const res = await request(app).post("/api/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "12345678",
      phone: "0639311784",
    });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("user registered successfully");

    const user = await User.findOne({ email: "john@example.com" });
    id = user._id.toString();
  });

  it("POST /login → should login user", async () => {
    const res = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "12345678",
    });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("user login successfully");
    expect(res.body.data).to.have.property("accessToken");
    expect(res.body.data).to.have.property("refreshToken");
  });

  it("GET /user/:id → should get user by id", async () => {
    const res = await request(app).get(`/api/user/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data.email).to.equal("john@example.com");
    expect(res.body.data).to.not.have.property("password");
  });

  it("PUT /update-user/:id → should update user", async () => {
    const res = await request(app)
      .put(`/api/update-user/${id}`)
      .send({ firstName: "Johnny" });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updatedUser = await User.findById(id);
    expect(updatedUser.firstName).to.equal("Johnny");
  });
});
