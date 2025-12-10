import userRouter from "./routers/user.router.js";
import roleRouter from "./routers/role.router.js";
import vehicleRouter from "./routers/vehicle.router.js";
import tripRouter from "./routers/trip.router.js";
import tireRouter from "./routers/tire.router.js";
import maintenanceRouter from "./routers/maintenance.router.js";
import maintenanceRuleRouter from "./routers/maintenance-rule.router.js";
import notificationRouter from "./routers/notification.router.js";

const path = "/api";

export const routers = [
  { path: `${path}`, route: userRouter },
  { path: `${path}`, route: roleRouter },
  { path: `${path}`, route: vehicleRouter },
  { path: `${path}`, route: tripRouter },
  { path: `${path}`, route: tireRouter },
  { path: `${path}`, route: maintenanceRouter },
  { path: `${path}`, route: maintenanceRuleRouter },
  { path: `${path}`, route: notificationRouter },
];

export default routers;
