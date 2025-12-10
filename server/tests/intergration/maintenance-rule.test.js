import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Maintenance Rule Routes", () => {
  let maintenanceRuleId;
  let token;

  setupDB();

  before(() => {
    token = generateToken();
  });

  it("POST /create-maintenance-rule → should create a new maintenance rule", async () => {
    const res = await request(app)
      .post("/api/create-maintenance-rule")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "oil",
        recommendedKm: 15000,
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    const rule = await Model.MaintenanceRule.findOne({ type: "oil" });
    expect(rule).to.exist;
    maintenanceRuleId = rule._id.toString();
  });

  it("GET /maintenance-rules → should get all maintenance rules", async () => {
    const res = await request(app)
      .get("/api/maintenance-rules")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
  });

  it("GET /maintenance-rule/:id → should get maintenance rule by id", async () => {
    const res = await request(app)
      .get(`/api/maintenance-rule/${maintenanceRuleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.type).to.equal("oil");
  });

  it("PUT /update-maintenance-rule/:id → should update maintenance rule", async () => {
    const res = await request(app)
      .put(`/api/update-maintenance-rule/${maintenanceRuleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        recommendedKm: 20000,
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updated = await Model.MaintenanceRule.findById(maintenanceRuleId);
    expect(updated.recommendedKm).to.equal(20000);
  });

  it("DELETE /delete-maintenance-rule/:id → should delete maintenance rule", async () => {
    const ruleToDelete = await Model.MaintenanceRule.create({
      type: "filter",
      recommendedKm: 10000,
    });

    const res = await request(app)
      .delete(`/api/delete-maintenance-rule/${ruleToDelete._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");

    const deleted = await Model.MaintenanceRule.findById(ruleToDelete._id);
    expect(deleted).to.be.null;
  });
});
