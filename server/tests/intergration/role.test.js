import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Role from "../../models/Role.js";
import mongoose from "mongoose";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Role Routes", () => {
  let roleId;
  let token;

  setupDB();

  before(() => {
    token = generateToken();
  });

  it("POST /create-role → should create a new role", async () => {
    const res = await request(app)
      .post("/api/create-role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Admin",
        description: "Administrator role",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    const role = await Role.findOne({ name: "Admin" });
    expect(role).to.exist;
    expect(role.description).to.equal("Administrator role");
    roleId = role._id.toString();
  });

  it("GET /roles → should get all roles", async () => {
    await request(app)
      .post("/api/create-role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Manager",
        description: "Manager role",
      });

    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
    expect(res.body.data.length).to.be.at.least(2);
  });

  it("GET /role/:id → should get role by id", async () => {
    const res = await request(app)
      .get(`/api/role/${roleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.name).to.equal("Admin");
    expect(res.body.data.description).to.equal("Administrator role");
  });

  it("PUT /update-role/:id → should update role", async () => {
    const res = await request(app)
      .put(`/api/update-role/${roleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Updated Administrator role",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updatedRole = await Role.findById(roleId);
    expect(updatedRole.description).to.equal("Updated Administrator role");
  });

  it("DELETE /delete-role/:id → should delete role", async () => {
    const createRes = await request(app)
      .post("/api/create-role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TempRole",
        description: "Temporary role to delete",
      });

    const tempRole = await Role.findOne({ name: "TempRole" });
    const tempRoleId = tempRole._id.toString();

    const res = await request(app)
      .delete(`/api/delete-role/${tempRoleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");

    const deletedRole = await Role.findById(tempRoleId);
    expect(deletedRole).to.be.null;
  });

  it("GET /role/:id → should return null for non-existent role", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/role/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.null;
  });

  it("PUT /update-role/:id → should update multiple fields", async () => {
    const res = await request(app)
      .put(`/api/update-role/${roleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "SuperAdmin",
        description: "Super Administrator role with full permissions",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updatedRole = await Role.findById(roleId);
    expect(updatedRole.name).to.equal("SuperAdmin");
    expect(updatedRole.description).to.equal(
      "Super Administrator role with full permissions"
    );
  });
});
