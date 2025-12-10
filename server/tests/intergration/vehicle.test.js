import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Vehicle Routes", () => {
  let fakeData = {
    plateNumber: 45789,
    brand: "Mercedes",
    model: "Actors",
    currentKm: 240500,
    status: "active",
    type: "truck",
  };
  let token;

  setupDB();

  before(() => {
    token = generateToken();
  });

  it("GET /vehicles -> should by get all vehicles ", async () => {
    await request(app)
      .post("/api/create-vehicle")
      .set("Authorization", `Bearer ${token}`)
      .send(fakeData);

    const res = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
  });

  it("POST /create-vehicle → should create a new vehicle ", async () => {
    const res = await request(app)
      .post("/api/create-vehicle")
      .set("Authorization", `Bearer ${token}`)
      .send(fakeData);

    await Model.Vehicle.findOne({ currentKm: 240500 });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");
  });

  it("DELETE /delete-vehicle/:id -> should delete a vehicle", async () => {
    await request(app)
      .post("/api/create-vehicle")
      .set("Authorization", `Bearer ${token}`)
      .send(fakeData);

    const vehicle = await Model.Vehicle.findOne({ currentKm: 240500 });
    const vehicleId = vehicle._id.toString();

    const res = await request(app)
      .delete(`/api/delete-vehicle/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");
  });

  it("GET /vehicle/:id -> should get vehicle by id", async () => {
    const createData = {
      plateNumber: 12345,
      brand: "Volvo",
      model: "FH",
      currentKm: 100000,
      status: "active",
      type: "truck",
    };

    await request(app)
      .post("/api/create-vehicle")
      .set("Authorization", `Bearer ${token}`)
      .send(createData);
    const vehicle = await Model.Vehicle.findOne({ currentKm: 100000 });
    const id = vehicle._id.toString();

    const res = await request(app)
      .get(`/api/vehicle/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.brand).to.equal("Volvo");
    expect(res.body.data.currentKm).to.equal(100000);
  });

  it("PUT /update-vehicle/:id -> should update vehicle", async () => {
    const createData = {
      plateNumber: 99999,
      brand: "Scania",
      model: "R",
      currentKm: 50000,
      status: "active",
      type: "truck",
    };

    await request(app)
      .post("/api/create-vehicle")
      .set("Authorization", `Bearer ${token}`)
      .send(createData);
    const vehicle = await Model.Vehicle.findOne({ plateNumber: 99999 });
    const id = vehicle._id.toString();

    const res = await request(app)
      .put(`/api/update-vehicle/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        brand: "Scania Updated",
        currentKm: 50500,
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updated = await Model.Vehicle.findById(id);
    expect(updated.brand).to.equal("Scania Updated");
    expect(updated.currentKm).to.equal(50500);
  });
});
