import { makeAutoObservable, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";

const CommonContext = createContext({})

export class CommonStore {
  inventory = []
  items = []

  constructor() {
		makeObservable(
			this,
			{
				inventory: observable,
				items: observable,
			}
		)
	}

  setInventory = (data) => {
    this.inventory = data
    this.items = data.filter(item => item.type !== "a")
  }

}

export const useCommonContext = () => useContext(CommonContext)

export const CommonProvider = ({ children }) => {
  return (
    <CommonContext.Provider value={new CommonStore()}>{children}</CommonContext.Provider>
  )
}