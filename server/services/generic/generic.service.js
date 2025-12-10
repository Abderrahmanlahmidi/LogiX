export const GenericService = (Model) => ({
  async getAll(options = {}) {
    let query = Model.find();

    if (options.select) query = query.select(options.select);
    if (options.populate) query = query.populate(options.populate);
    if (options.sort) query = query.sort(options.sort);

    return await query;
  },

  async getOne(id, options = {}) {
    let query = Model.findById(id);

    if (options.select) query = query.select(options.select);
    if (options.populate) query = query.populate(options.populate);
    if (options.sort) query = query.sort(options.sort);

    return query;
  },

  async create(data) {
    return Model.create(data);
  },

  async update(id, data) {
    return Model.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return Model.findByIdAndDelete(id);
  },
});
