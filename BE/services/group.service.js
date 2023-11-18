const AppError = require("../errors/AppError");
const GroupRepository = require("../repositories/group.repository");

class GroupService {
  static createGroup = async (g) => {
    try {
      const newGroup = await GroupRepository.createGroup(g);
      return newGroup;
    } catch (error) {
      return new AppError();
    }
  };
}
module.exports = GroupService;