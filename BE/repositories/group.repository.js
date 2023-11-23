const AppError = require("../errors/AppError");
const { group } = require("../models/group");

class GroupRepository {
  static createGroup = (g) => {
    try {
      const newGroup = group.create(g);
      return newGroup;
    } catch (error) {
      return new AppError(error.message);
    }
  };
}
module.exports = GroupRepository;
