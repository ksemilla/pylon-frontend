import { useEffect } from "react"
import { useFieldArray } from "react-hook-form"
import { useCommonContext } from "stores/common"
import AutoSuggest from "utils/AutoSuggest"

const QuotationAssemblyItemInline = ({ idx, register, setValue, nestedIdx, watch, item, remove, callbackFunc}) => {

  const commonContext = useCommonContext()

  const onSelect = data => {
    setValue(`items[${nestedIdx}].assembly_items[${idx}].sell_price`, data.sell_price)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].quantity`, 0)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].item`, data.id)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].item_detail`, data)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].part_number`, data)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].type`, data.type)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].assembly_items`, data.items)
    setValue(`items[${nestedIdx}].assembly_items[${idx}].description`, data.description)

  }

  const quantity = watch(`items[${nestedIdx}].assembly_items[${idx}].quantity`)
  const sellPrice = watch(`items[${nestedIdx}].assembly_items[${idx}].sell_price`)
  callbackFunc()

  useEffect(()=>{
    setValue(`items[${nestedIdx}].assembly_items[${idx}].order`, idx)
  }, [])

  return (
    <div className="flex">
      <div className="text-left w-6">{String.fromCharCode(idx+97)}.</div>
      <div className="grid grid-cols-12 gap-y-6 gap-x-4">
        <div className="col-span-3">
          <AutoSuggest
            attribute="part_number"
            choices={commonContext.items}
            value={item.item_detail}
            onSelect={onSelect}
          />
        </div>
        <div className="col-span-3">
          <input
            type="number"
            min={0}
            step="0.01"
            {...register(`items[${nestedIdx}].assembly_items[${idx}].quantity`)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-3">
          <input
            type="number"
            min={0}
            step="0.01"
            {...register(`items[${nestedIdx}].assembly_items[${idx}].sell_price`)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
            <button
            onClick={(e)=>{
              e.preventDefault()
              remove(idx)
            }}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

const QuotationAssemblyItemFieldArray = ({ control, register, nestedIdx, type, callbackFunc, watch, setValue }) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestedIdx}].assembly_items`,
    keyName: "uuid"
  })

  const onAppend = (e) => {
    e.preventDefault()
    append({
      quantity: 0,
      sell_price: 0,
      item_detail: {
        part_number: ""
      }
    })
  }



  return (
    <div>
      {fields.map((item, idx) => {
        return (
          <QuotationAssemblyItemInline key={item.uuid} item={item} {...{control, register, nestedIdx, type, watch, setValue, idx, remove, callbackFunc}}/>
        )
      })}
      {type === "a" && 
        <button
          onClick={onAppend}
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
        >
          Add part
        </button>}
    </div>
  )
}

export default QuotationAssemblyItemFieldArray