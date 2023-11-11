// Define error messages
const errorMessages = {
  USER_NOT_FOUND: "User not found.",
  INVALID_INPUT: "Invalid data provided.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  RESOURCE_NOT_FOUND: "The requested resource was not found.",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  SERVICE_UNAVAILABLE:
    "Service is currently unavailable. Please try again later.",
  EMAIL_INVALID: "This email address is invalid.",
  EMAIL_NOT_EXIST: "This email address does not exist.",
  EMAIL_EXISTED: "This email address already exists.",
  FRIEND_REQUEST_FAILED: "Friend request failed.",
  FRIEND_ADDITION_FAILED: "Failed to add friend.",
  FRIEND_REMOVAL_FAILED: "Failed to remove friend.",
  LOGIN_FAILED: "Login failed. Please check your credentials.",
  LOGOUT_FAILED: "Logout failed. Please try again.",
  DATA_RETRIEVAL_FAILED: "Failed to retrieve data.",
  USER_CREATION_FAILED: "User creation failed.",
  USER_UPDATE_FAILED: "User update failed.",
  USER_DELETION_FAILED: "User deletion failed.",
  POST_NOT_FOUND: "Post not found.",
  POST_CREATION_FAILED: "Post creation failed.",
  POST_UPDATE_FAILED: "Post update failed.",
  POST_DELETION_FAILED: "Post deletion failed.",
  COMMENT_CREATION_FAILED: "Comment creation failed.",
  COMMENT_UPDATE_FAILED: "Comment update failed.",
  COMMENT_DELETION_FAILED: "Comment deletion failed.",
  LIKE_FAILED: "Liking the content failed.",
  UNLIKE_FAILED: "Unliking the content failed.",
  UPLOAD_FILE_FAILED: "Upload file failed.",
  FILE_TOO_LARGE: "File size is too large. The maximum size allowed is 50MB.",
  FILE_COUNT_LIMIT: "Limit exceeded. The maximum file allowed is 5.",
  UNSUPPORTED_FILE: "Unsupported file format.",
};

// Export error messages
module.exports = errorMessages;
