export const Constants = {
  API: 'api',
  API_VERSION_1: '1',
  AUTH: 'auth',
  BAD_REQ: 'Bad request',
  UNAUTH_REQ: 'Unauthorized',
  NOT_FOUND: 'Not found',
  UPDATE_FAILED: 'Update failed',
  GENERIC_ERROR: 'An error occurred',
  SUCCESS: 'success',
  FAILED: 'failed',
  OTP_MESSAGE: 'OTP is',
} as const;

export const ApiPaths = {
  USERS: 'users',
  PROFILE: 'profile',
} as const;

export const Configs = {
  JWT_EXPIRY_TIME: '365d',
  MAX_FILE_SIZE: 1024 * 1024 * 10,
  API_TIMEOUT: 300000,
} as const;

export const ResponseMessages = {
  UNABLE_CREATE_OTP: 'Unable to create OTP!',
  INVALID_OTP: 'The OTP is not valid!',
  CREATED_OTP: 'OTP created successfully',
  RESEND_OTP: 'OTP resend was successful',
  VERIFY_OTP: 'OTP verify was successful',
  ALREADY_ACTIVATED: 'Already activated',
  TOKEN_EXPIRED: 'Token expired',
  REGISTER_SUCCESS: 'Register success',
  REGISTER_FAILED: 'Register failed',
  EXPIRED_OTP: 'OTP expired',
} as const;
