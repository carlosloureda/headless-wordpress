export interface RegisterUserType {
  username: string
  email: string
  password: string
}

export interface User {
  username: string
  email: string
  name: string
  password: string
  authToken: string
  jwtRefreshToken: string
  jwtAuthToken: string
}

export interface IAuthData {
  authToken: string
  refreshToken: string
  user: User
  isLoading: boolean | null
}

export type tLoginUser = {
  username: string
  password: string
}
