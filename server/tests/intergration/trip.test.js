import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Trip Routes", () => {
  let tripId;
  let driverId;
  let truckId;
  let trailerId;
  let token;

  setupDB();

  before(async () => {

    token = generateToken();

    const driverData = {
      firstName: "John",
      lastName: "Doe",
      email: "driver@trip.test",
      password: "hashed",
      phone: "0612345678",
    };
    
    const driverRole = await Model.Role.create({
      name: "Driver",
      description: "Driver",
    });
    const driver = await Model.User.create({
      ...driverData,
      roleId: driverRole._id,
    });
    driverId = driver._id.toString();

    const truck = await Model.Vehicle.create({
      plateNumber: "555001",
      brand: "Volvo",
      model: "FH16",
      currentKm: 100000,
      status: "active",
      type: "truck",
    });

    const trailer = await Model.Vehicle.create({
      plateNumber: "145278",
      brand: "TestTruck",
      model: "FH30",
      currentKm: 105000,
      status: "active",
      type: "trailer",
    });

    truckId = truck._id.toString();
    trailerId = trailer._id.toString();
  });

  it("POST /create-trip → should create a new trip", async () => {
    const res = await request(app)
      .post("/api/create-trip")
      .set("Authorization", `Bearer ${token}`)
      .send({
        driverId: driverId,
        truckId: truckId,
        trailerId: trailerId,
        startLocation: "Paris",
        endLocation: "Berlin",
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        status: "pending",
        fuelLiters: 200,
        remarks: "Long distance trip",
      });

    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body.status).to.equal("create successfully");
    expect(res.body.data).to.exist;
    expect(res.body.data.startLocation).to.equal("Paris");

    tripId = res.body.data._id;

    expect(mongoose.Types.ObjectId.isValid(tripId)).to.be.true;
  });

  it("GET /trips → should get all trips", async () => {
    const res = await request(app)
      .get("/api/trips")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
  });

  it("GET /trip/:id → should get trip by id", async () => {
    if (!tripId) throw new Error("tripId is undefined");

    const res = await request(app)
      .get(`/api/trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.startLocation).to.equal("Paris");
  });

  it("PUT /update-trip/:id → should update trip", async () => {
    if (!tripId) throw new Error("tripId is undefined");

    const res = await request(app)
      .put(`/api/update-trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        fuelLiters: 250,
        status: "active",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");
    expect(res.body.data).to.exist;
    expect(res.body.data.fuelLiters).to.equal(250);
  });

  it("DELETE /delete-trip/:id → should delete trip", async () => {
    const tripToDelete = await Model.Trip.create({
      driverId: driverId,
      truckId: truckId,
      trailerId: trailerId,
      startLocation: "Paris",
      endLocation: "Berlin",
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000),
      status: "pending",
      fuelLiters: 200,
      remarks: "Long distance trip",
    });

    const idToDelete = tripToDelete._id.toString();

    const res = await request(app)
      .delete(`/api/delete-trip/${idToDelete}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");
    expect(res.body.data).to.exist;
    expect(res.body.data._id).to.equal(idToDelete);

    const deleted = await Model.Trip.findById(idToDelete);
    expect(deleted).to.be.null;
  });
});
