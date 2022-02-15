import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

const AuthContext = createContext({})

export class AuthStore {
  isLogged = false
  user = {}

  constructor() {
    makeAutoObservable(this)
	}

  setIsLogged = data => {
    this.isLogged = data
  }

  setUser = data => {
    this.user = data
  }

  logUserIn = data => {
    this.setUser(data)
    this.setIsLogged(true)
  }

  logUserOut = () => {
    this.setUser({})
    this.setIsLogged(false)
    localStorage.removeItem('access')
  }

}

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={new AuthStore()}>{children}</AuthContext.Provider>
  )
}