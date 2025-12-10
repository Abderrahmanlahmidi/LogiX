import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Trip Routes", () => {
  let tripId;
  let driverId;
  let vehicleId;
  let token;

  setupDB();

  before(async () => {
    token = generateToken();
    const driverData = {
      firstName: "John",
      lastName: "Doe",
      email: "driver@trip.test",
      password: "12345678",
      phone: "0612345678",
    };
    const driver = await Model.User.create({
      ...driverData,
      password: "hashed",
      roleId: await Model.Role.create({
        name: "Driver",
        description: "Driver",
      }).then((r) => r._id),
    });
    driverId = driver._id.toString();

    const vehicle = await Model.Vehicle.create({
      plateNumber: 555001,
      brand: "Volvo",
      model: "FH16",
      currentKm: 100000,
      status: "active",
      type: "truck",
    });
    vehicleId = vehicle._id.toString();
  });

  it("POST /create-trip → should create a new trip", async () => {
    const res = await request(app)
      .post("/api/create-trip")
      .set("Authorization", `Bearer ${token}`)
      .send({
        driverId: driverId,
        vehicleId: vehicleId,
        startLocation: "Paris",
        endLocation: "Berlin",
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        status: "pending",
        fuelLiters: 200,
        remarks: "Long distance trip",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    // Use response data
    expect(res.body.data).to.exist;
    expect(res.body.data.startLocation).to.equal("Paris");
    tripId = res.body.data._id;
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
    const res = await request(app)
      .get(`/api/trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.startLocation).to.equal("Paris");
  });

  it("PUT /update-trip/:id → should update trip", async () => {
    const res = await request(app)
      .put(`/api/update-trip/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "active",
        fuelLiters: 250,
      });
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");
    expect(res.body.data).to.exist;
    expect(res.body.data.status).to.equal("active");
    expect(res.body.data.fuelLiters).to.equal(250);
  });

  it("DELETE /delete-trip/:id → should delete trip", async () => {
    // Create and delete a trip
    const tripToDelete = await Model.Trip.create({
      driverId: driverId,
      vehicleId: vehicleId,
      startLocation: "London",
      endLocation: "Paris",
      status: "pending",
    });
    const idToDelete = tripToDelete._id.toString();
    const res = await request(app)
      .delete(`/api/delete-trip/${idToDelete}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");
    expect(res.body.data).to.exist;
    expect(res.body.data._id).to.equal(idToDelete);
    // Confirm trip is deleted from DB
    const deleted = await Model.Trip.findById(idToDelete);
    expect(deleted).to.be.null;
  });
});
