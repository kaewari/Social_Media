const multer = require("multer");
const { parser } = require("../middlewares/multerMiddleware");
const errorMessages = require("../constants/error_msg");
const statusCodes = require("../constants/status_code");
const successMessages = require("../constants/success_msg");
const AppError = require("../errors/AppError");
const GroupService = require("../services/group.service");
exports.createGroup = async (req, res) => {
  try {
    const group_fields = req.body;
    const newGroup = await GroupService.createGroup(group_fields);
    if (newGroup instanceof AppError)
      return res.status(newGroup.statusCode).json({
        code: newGroup.statusCode,
        message: newGroup.message,
      });
    return res.status(statusCodes.OK).json({
      code: statusCodes.OK,
      message: successMessages.GROUP_CREATED,
      metadata: newGroup,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      code: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
