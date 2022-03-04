import { createAssembly, createDocument, createLabor, createStock } from "api/items"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemForm from "../forms/ItemForm"

const ItemAdd = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = data => {
    setIsLoading(true)
    if (data.type === "a") {
      console.log(data)
      createAssembly(data)
      .then(res=>{
        console.log(res.data)
        setIsLoading(false)
      })
      .catch(res=>{
        console.log(res.response)
        setIsLoading(false)
      })
    } else {
      delete data.items
      if (data.type === "s") {
        createStock(data)
        .then(res=>{
          console.log(res.data)
          setIsLoading(false)
        })
        .catch(res=>{
          console.log(res.response)
          setIsLoading(false)
        })
      } else if (data.type === "l") {
        createLabor(data)
        .then(res=>{
          console.log(res.data)
          setIsLoading(false)
        })
        .catch(res=>{
          console.log(res.response)
          setIsLoading(false)
        })
      } else if (data.type === "d") {
        createDocument(data)
        .then(res=>{
          console.log(res.data)
          setIsLoading(false)
        })
        .catch(res=>{
          console.log(res.response)
          setIsLoading(false)
        })
      }
    }
    
  }

  return (
    <div className="p-2 bg-white border border-gray-200 rounded-md">
      <ItemForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

export default ItemAdd