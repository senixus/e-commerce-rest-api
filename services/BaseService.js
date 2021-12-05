class BaseService {
  getAll() {
    return this.model.find();
  }

  create(model) {
    return this.model.create(model);
  }
  update(id, model) {
    return this.model.findByIdAndUpdate(id, model);
  }
  remove(id) {
    return this.model.findByIdAndDelete(id);
  }

  getById(id) {
    return this.model.findById(id);
  }
}

module.exports = BaseService;
