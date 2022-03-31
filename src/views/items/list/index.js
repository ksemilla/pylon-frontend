import { getInventory } from "api/items"
import { useEffect, useState } from "react"

import ItemInline from "./components/ItemInline"

const ItemList = () => {

  const [items, setItems] = useState([])

  useEffect(()=>{
    getInventory()
    .then(res=>{
      setItems(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
  }, [])

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-2 grid grid-cols-12 span-x-4 bg-gray-300">
        <div>ID</div>
        <div className="col-span-3">Part Number</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Description</div>
      </div>
      <div>
        {items.map((item, idx) => (
          <ItemInline key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default ItemList