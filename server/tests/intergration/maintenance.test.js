import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Maintenance Routes", () => {
  let maintenanceId;
  let maintenanceRuleId;
  let vehicleId;
  let token;

  setupDB();

  before(async () => {
    token = generateToken();
    const rule = await Model.MaintenanceRule.create({
      type: "oil",
      recommendedKm: 10000,
    });
    maintenanceRuleId = rule._id.toString();

    const vehicle = await Model.Vehicle.create({
      plateNumber: 555003,
      brand: "Mercedes",
      model: "Actros",
      currentKm: 150000,
      status: "active",
      type: "truck",
    });
    vehicleId = vehicle._id.toString();
  });

  it("POST /create-maintenance → should create a new maintenance", async () => {
    const res = await request(app)
      .post("/api/create-maintenance")
      .set("Authorization", `Bearer ${token}`)
      .send({
        maintenanceRuleId: maintenanceRuleId,
        description: "Oil change and filter replacement",
        cost: "150",
        date: new Date(),
        vehicleId: vehicleId,
        kmAtMaintenance: 150000,
        targetType: "truck",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    const maintenance = await Model.Maintenance.findOne({
      description: "Oil change and filter replacement",
    });
    expect(maintenance).to.exist;
    maintenanceId = maintenance._id.toString();
  });

  it("GET /maintenances → should get all maintenances", async () => {
    const res = await request(app)
      .get("/api/maintenances")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
  });

  it("GET /maintenance/:id → should get maintenance by id", async () => {
    const res = await request(app)
      .get(`/api/maintenance/${maintenanceId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.description).to.equal(
      "Oil change and filter replacement"
    );
  });

  it("PUT /update-maintenance/:id → should update maintenance", async () => {
    const res = await request(app)
      .put(`/api/update-maintenance/${maintenanceId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cost: "200",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updated = await Model.Maintenance.findById(maintenanceId);
    expect(updated.cost).to.equal("200");
  });

  it("DELETE /delete-maintenance/:id → should delete maintenance", async () => {
    const maintToDelete = await Model.Maintenance.create({
      maintenanceRuleId: maintenanceRuleId,
      description: "Brake inspection",
      cost: "100",
      vehicleId: vehicleId,
      kmAtMaintenance: 150000,
      targetType: "truck",
    });

    const res = await request(app)
      .delete(`/api/delete-maintenance/${maintToDelete._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");

    const deleted = await Model.Maintenance.findById(maintToDelete._id);
    expect(deleted).to.be.null;
  });
});
