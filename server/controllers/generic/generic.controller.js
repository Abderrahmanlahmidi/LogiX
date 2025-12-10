export const GenericController = (Services) => ({
  getAll: async (req, res) => {
    try {
      const data = await Services.getAll(req.options || {});
      res.status(200).json({ status: "success", data });
    } catch (err) {
      res.status(400).json({ status: "error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const data = await Services.getOne(req.params.id, req.options || {});
      res.status(200).json({ status: "success", data });
    } catch (err) {
      res.status(400).json({ status: "error", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const created = await Services.create(req.body);
      res.status(200).json({
        status: "create successfully",
        data: created,
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        error: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Services.update(req.params.id, req.body);
      res.status(200).json({
        status: "updated successfully",
        data: updated,
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        error: err.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await Services.delete(req.params.id);
      res.status(200).json({
        status: "delete successfully",
        data: deleted,
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        error: err.message,
      });
    }
  },
});
