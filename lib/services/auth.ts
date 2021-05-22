const AUTH_DATA_KEY = `wbpAuthData`
import { User } from '../types/user'

type AuthData = {
  refreshToken: string
  user: User
}
/**
 * Retrieves the auth data from localstorage
 * @returns {object} The auth data object
 */
export const getPersistedAuthData = (): AuthData => JSON.parse(localStorage.getItem(AUTH_DATA_KEY))

/**
 * Stores the auth data in localstorage
 * @param {object} authData The auth data object
 */
export const setPersistedAuthData = (authData: AuthData): void =>
  localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData))

/**
 * Deletes the auth data from localstorage
 * @returns {object} The auth data object
 */
export const deletePersistedAuthData = (): void => localStorage.removeItem(AUTH_DATA_KEY)
