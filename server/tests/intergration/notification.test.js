import { expect } from "chai";
import request from "supertest";
import app from "../settings/app.js";
import Model from "../../models/index.js";
import { setupDB, generateToken } from "../settings/setup.js";

describe("Notification Routes", () => {
  let notificationId;
  let userId;
  let token;

  setupDB();

  before(async () => {
    token = generateToken();
    const role = await Model.Role.create({
      name: "Driver",
      description: "Driver role",
    });
    const user = await Model.User.create({
      firstName: "reda",
      lastName: "smail",
      email: "reda@test.com",
      password: "hashed",
      phone: "0612345678",
      roleId: role._id,
    });
    userId = user._id.toString();
  });

  it("POST /create-notification → should create a new notification", async () => {
    const res = await request(app)
      .post("/api/create-notification")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        title: "Maintenance Alert",
        description: "Your vehicle needs oil change",
        isRead: false,
        type: "warning",
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("create successfully");

    const notif = await Model.Notification.findOne({
      title: "Maintenance Alert",
    });
    expect(notif).to.exist;
    notificationId = notif._id.toString();
  });

  it("GET /notifications → should get all notifications", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.be.an("array");
  });

  it("GET /notification/:id → should get notification by id", async () => {
    const res = await request(app)
      .get(`/api/notification/${notificationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.data).to.exist;
    expect(res.body.data.title).to.equal("Maintenance Alert");
  });

  it("PUT /update-notification/:id → should update notification", async () => {
    const res = await request(app)
      .put(`/api/update-notification/${notificationId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        isRead: true,
      });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("updated successfully");

    const updated = await Model.Notification.findById(notificationId);
    expect(updated.isRead).to.equal(true);
  });

  it("DELETE /delete-notification/:id → should delete notification", async () => {
    const notifToDelete = await Model.Notification.create({
      userId: userId,
      title: "Temp Notification",
      description: "To be deleted",
      isRead: false,
      type: "info",
    });

    const res = await request(app)
      .delete(`/api/delete-notification/${notifToDelete._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("delete successfully");

    const deleted = await Model.Notification.findById(notifToDelete._id);
    expect(deleted).to.be.null;
  });
});
