import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";
import Tire from "../models/Tire.js";
import Maintenance from "../models/Maintenance.js";
import MaintenanceRule from "../models/MaintenanceRule.js";
import Notification from "../models/Notification.js";

dotenv.config();

const seeders = [
  {
    model: "Role",
    documents: [
      {
        name: "Admin",
        description: "Administrator with full system access",
      },
      {
        name: "Manager",
        description: "Manager role for supervisory tasks",
      },
      {
        name: "Driver",
        description: "Driver role for vehicle operation",
      },
      {
        name: "Mechanic",
        description: "Mechanic role for vehicle maintenance",
      },
    ],
  },
];

async function seedRoles() {
  try {
    const existingRoles = await Role.countDocuments();
    if (existingRoles > 0) {
      console.log("Roles already exist, skipping...");
      return;
    }

    const roles = await Role.insertMany([
      {
        name: "Admin",
        description: "Administrator with full system access",
      },
      {
        name: "Manager",
        description: "Manager role for supervisory tasks",
      },
      {
        name: "Driver",
        description: "Driver role for vehicle operation",
      },
      {
        name: "Mechanic",
        description: "Mechanic role for vehicle maintenance",
      },
    ]);
    console.log("✓ Roles seeded successfully");
    return roles;
  } catch (err) {
    console.error("Error seeding roles:", err.message);
  }
}

async function seedUsers(roles) {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log("Users already exist, skipping...");
      return;
    }

    const driverRole = roles.find((r) => r.name === "Driver");
    const users = await User.insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "hashed_password_123",
        phone: "0612345678",
        roleId: driverRole._id,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "hashed_password_456",
        phone: "0698765432",
        roleId: driverRole._id,
      },
      {
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert.johnson@example.com",
        password: "hashed_password_789",
        phone: "0654321098",
        roleId: driverRole._id,
      },
    ]);
    console.log("✓ Users seeded successfully");
    return users;
  } catch (err) {
    console.error("Error seeding users:", err.message);
  }
}

async function seedVehicles() {
  try {
    const existingVehicles = await Vehicle.countDocuments();
    if (existingVehicles > 0) {
      console.log("Vehicles already exist, skipping...");
      return;
    }

    const vehicles = await Vehicle.insertMany([
      {
        plateNumber: 100001,
        brand: "Volvo",
        model: "FH16",
        currentKm: 150000,
        status: "active",
        type: "truck",
      },
      {
        plateNumber: 100002,
        brand: "Mercedes",
        model: "Actros",
        currentKm: 200000,
        status: "active",
        type: "truck",
      },
      {
        plateNumber: 100003,
        brand: "Scania",
        model: "R480",
        currentKm: 175000,
        status: "active",
        type: "truck",
      },
      {
        plateNumber: 100004,
        brand: "MAN",
        model: "TGX",
        currentKm: 120000,
        status: "maintenance",
        type: "truck",
      },
    ]);
    console.log("✓ Vehicles seeded successfully");
    return vehicles;
  } catch (err) {
    console.error("Error seeding vehicles:", err.message);
  }
}

async function seedMaintenanceRules() {
  try {
    const existingRules = await MaintenanceRule.countDocuments();
    if (existingRules > 0) {
      console.log("Maintenance rules already exist, skipping...");
      return;
    }

    const rules = await MaintenanceRule.insertMany([
      {
        type: "oil",
        recommendedKm: 10000,
      },
      {
        type: "filter",
        recommendedKm: 15000,
      },
      {
        type: "brake",
        recommendedKm: 20000,
      },
      {
        type: "tire",
        recommendedKm: 25000,
      },
    ]);
    console.log("✓ Maintenance rules seeded successfully");
    return rules;
  } catch (err) {
    console.error("Error seeding maintenance rules:", err.message);
  }
}

async function seedTires(vehicles) {
  try {
    const existingTires = await Tire.countDocuments();
    if (existingTires > 0) {
      console.log("Tires already exist, skipping...");
      return;
    }

    const vehicleId = vehicles[0]._id;
    const tires = await Tire.insertMany([
      {
        serialNumber: 1001,
        wearLevel: "80%",
        position: "Front-Left",
        installedOn: "truck",
        vehicleId: vehicleId,
      },
      {
        serialNumber: 1002,
        wearLevel: "75%",
        position: "Front-Right",
        installedOn: "truck",
        vehicleId: vehicleId,
      },
      {
        serialNumber: 1003,
        wearLevel: "70%",
        position: "Rear-Left",
        installedOn: "truck",
        vehicleId: vehicleId,
      },
      {
        serialNumber: 1004,
        wearLevel: "70%",
        position: "Rear-Right",
        installedOn: "truck",
        vehicleId: vehicleId,
      },
    ]);
    console.log("✓ Tires seeded successfully");
    return tires;
  } catch (err) {
    console.error("Error seeding tires:", err.message);
  }
}

async function seedMaintenance(vehicles, maintenanceRules) {
  try {
    const existingMaintenance = await Maintenance.countDocuments();
    if (existingMaintenance > 0) {
      console.log("Maintenance records already exist, skipping...");
      return;
    }

    const vehicleId = vehicles[0]._id;
    const ruleId = maintenanceRules[0]._id;

    const maintenance = await Maintenance.insertMany([
      {
        vehicleId: vehicleId,
        maintenanceRuleId: ruleId,
        description: "Scheduled oil change",
        cost: 150,
        date: new Date("2024-06-01"),
        kmAtMaintenance: 150000,
        targetType: "truck",
      },
      {
        vehicleId: vehicleId,
        maintenanceRuleId: maintenanceRules[1]._id,
        description: "Filter replacement",
        cost: 80,
        date: new Date("2024-06-15"),
        kmAtMaintenance: 150500,
        targetType: "truck",
      },
      {
        vehicleId: vehicles[1]._id,
        maintenanceRuleId: maintenanceRules[2]._id,
        description: "Brake inspection and pad replacement",
        cost: 250,
        date: new Date("2024-07-01"),
        kmAtMaintenance: 200000,
        targetType: "truck",
      },
    ]);
    console.log("✓ Maintenance records seeded successfully");
    return maintenance;
  } catch (err) {
    console.error("Error seeding maintenance:", err.message);
  }
}

async function seedTrips(users, vehicles) {
  try {
    const existingTrips = await Trip.countDocuments();
    if (existingTrips > 0) {
      console.log("Trips already exist, skipping...");
      return;
    }

    const trips = await Trip.insertMany([
      {
        driverId: users[0]._id,
        vehicleId: vehicles[0]._id,
        startLocation: "Paris",
        endLocation: "Berlin",
        startDate: new Date("2024-06-01T08:00:00"),
        endDate: new Date("2024-06-02T16:00:00"),
        status: "done",
        fuelLiters: 250,
        remarks: "Completed on schedule",
      },
      {
        driverId: users[1]._id,
        vehicleId: vehicles[1]._id,
        startLocation: "Amsterdam",
        endLocation: "Frankfurt",
        startDate: new Date("2024-06-05T09:00:00"),
        endDate: new Date("2024-06-05T17:00:00"),
        status: "done",
        fuelLiters: 180,
        remarks: "No issues reported",
      },
      {
        driverId: users[0]._id,
        vehicleId: vehicles[2]._id,
        startLocation: "Brussels",
        endLocation: "Munich",
        startDate: new Date("2024-06-10T07:00:00"),
        endDate: null,
        status: "active",
        fuelLiters: 300,
        remarks: "Currently in transit",
      },
    ]);
    console.log("✓ Trips seeded successfully");
    return trips;
  } catch (err) {
    console.error("Error seeding trips:", err.message);
  }
}

async function seedNotifications(users) {
  try {
    const existingNotifications = await Notification.countDocuments();
    if (existingNotifications > 0) {
      console.log("Notifications already exist, skipping...");
      return;
    }

    const notifications = await Notification.insertMany([
      {
        userId: users[0]._id,
        title: "Maintenance Due",
        description: "Vehicle 100001 requires oil change",
        isRead: false,
        type: "warning",
      },
      {
        userId: users[1]._id,
        title: "Trip Completed",
        description: "Your trip to Frankfurt has been completed",
        isRead: true,
        type: "info",
      },
      {
        userId: users[2]._id,
        title: "Tire Wear Alert",
        description: "Front-left tire wear level is critical",
        isRead: false,
        type: "warning",
      },
      {
        userId: users[0]._id,
        title: "New Trip Assignment",
        description: "You have been assigned a new trip to Munich",
        isRead: true,
        type: "info",
      },
    ]);
    console.log("✓ Notifications seeded successfully");
    return notifications;
  } catch (err) {
    console.error("Error seeding notifications:", err.message);
  }
}

async function runSeeders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data (optional - comment out to keep existing data)
    // await Role.deleteMany({});
    // await User.deleteMany({});
    // await Vehicle.deleteMany({});
    // await Trip.deleteMany({});
    // await Tire.deleteMany({});
    // await Maintenance.deleteMany({});
    // await MaintenanceRule.deleteMany({});
    // await Notification.deleteMany({});

    const roles = await seedRoles();
    const users = await seedUsers(roles);
    const vehicles = await seedVehicles();
    const maintenanceRules = await seedMaintenanceRules();
    await seedTires(vehicles);
    await seedMaintenance(vehicles, maintenanceRules);
    await seedTrips(users, vehicles);
    await seedNotifications(users);

    console.log("\n✓ All seeders completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

runSeeders();
