import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useCommonContext } from "stores/common"
import AutoSuggest from "utils/AutoSuggest"

const AssemblyItemForm = ({ register, idx, item, setValue, watch, remove, quantity, sellPrice}) => {

  const commonContext = useCommonContext()

  const onSelect = data => {
    setValue(`items[${idx}].quantity`, 0)
    setValue(`items[${idx}].item`, data.id)
    setValue(`items[${idx}].item_detail`, data)
    setValue(`items[${idx}].type`, data.type)
    setValue(`items[${idx}].sell_price`, data.sell_price)
    // setValue(`items[${idx}].assembly_items`, data.items)
    setValue(`items[${idx}].description`, data.description)
  }

  useEffect(()=>{
    setValue('order', idx)
  }, [idx])
  
  let total = quantity * sellPrice

  return (
    <div className="flex">
      <div className="w-6">{idx+1}.</div>
      <div className="flex flex-1 grid grid-cols-12 gap-y-6 gap-x-4">
        <div className="col-span-4">
          <AutoSuggest
            attribute="part_number"
            choices={commonContext.inventory}
            value={item.item_detail}
            onSelect={onSelect}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            min={0}
            step="0.01"
            {...register(`items.${idx}.quantity`)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            min={0}
            step="0.01"
            {...register(`items.${idx}.sell_price`)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-1">
          {(Math.round(total * 100) / 100).toFixed(2)}
        </div>
        <div className="col-span-2">
          <button
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-600 hover:bg-red-700"
            onClick={()=>remove(idx)}
          >remove</button>
        </div>
      </div>
    </div>
  )
}

export default observer(AssemblyItemForm)