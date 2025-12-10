import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Tire Routes", () => {
  let tireId;
  let vehicleId;
  let token;

  setupDB();

  before(async () => {
    token = generateToken();
    const vehicle = await Model.Vehicle.create({
      plateNumber: 555002,
      brand: "Scania",
      model: "R480",
      currentKm: 50000,
      status: "active",
      type: "truck",
    });
    vehicleId = vehicle._id.toString();
  });

  it("POST /create-tire → should create a new tire", async () => {
    const res = await request(app)
      .post("/api/create-tire")
      .set("Authorization", `Bearer ${token}`)
      .send({
        serialNumber: 123456,
        wearLevel: "80%",
        position: "Front-Left",
        installedOn: "truck",
        vehicleId: vehicleId,
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    const tire = await Model.Tire.findOne({ serialNumber: 123456 });
    expect(tire).to.exist;
    tireId = tire._id.toString();
  });

  it("GET /tires → should get all tires", async () => {
    const res = await request(app)
      .get("/api/tires")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
  });

  it("GET /tire/:id → should get tire by id", async () => {
    const res = await request(app)
      .get(`/api/tire/${tireId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.serialNumber).to.equal(123456);
  });

  it("PUT /update-tire/:id → should update tire", async () => {
    const res = await request(app)
      .put(`/api/update-tire/${tireId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        wearLevel: "60%",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updated = await Model.Tire.findById(tireId);
    expect(updated.wearLevel).to.equal("60%");
  });

  it("DELETE /delete-tire/:id → should delete tire", async () => {
    const tireToDelete = await Model.Tire.create({
      serialNumber: 999999,
      wearLevel: "50%",
      position: "Rear-Left",
      installedOn: "truck",
      vehicleId: vehicleId,
    });

    const res = await request(app)
      .delete(`/api/delete-tire/${tireToDelete._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");

    const deleted = await Model.Tire.findById(tireToDelete._id);
    expect(deleted).to.be.null;
  });
});
