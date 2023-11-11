import errorMessages from "../constants/error_msg";
import statusCodes from "../constants/status_code";
import LikeService from "../services/like.service";
export async function updateLike(req, res) {
  try {
    return await LikeService.updateLike();
  } catch (error) {
    if (statusCodes.NOT_FOUND === error.message)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: errorMessages.POST_NOT_FOUND });
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: errorMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}
