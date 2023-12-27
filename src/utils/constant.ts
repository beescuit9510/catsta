import { AuthErrorCodes } from 'firebase/auth'

export const ErrorMessage: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_EMAIL]: 'Given email is not valid',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Given email is already in use',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]:
    'Given email or password is wrong. Please try again',
} as const
