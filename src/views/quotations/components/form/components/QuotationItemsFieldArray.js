import { useFieldArray } from "react-hook-form"
import QuotationAssemblyItemFieldArray from "./QuotationAssemblyItemFieldArray"
import AutoSuggest from "utils/AutoSuggest"
import { useCommonContext } from "stores/common"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"

const QuotatinItemInline = ({ watch, register, control, idx, setValue,  getValues, item, remove }) => {

  const commonContext = useCommonContext()
  const [showParts, setShowParts] = useState(false)

  const type = watch(`items[${idx}].type`)
  const onSelect = data => {
    setValue(`items[${idx}].quantity`, 0)
    setValue(`items[${idx}].item`, data.id)
    setValue(`items[${idx}].item_detail`, data)
    setValue(`items[${idx}].type`, data.type)
    setValue(`items[${idx}].assembly_items`, data.items)
    setValue(`items[${idx}].description`, data.description)

    if (data.type === "a") {
      let tempTotal = 0
      data.items.forEach((currItem, tindx) => {
        tempTotal += currItem.quantity * currItem.sell_price
      })
      setValue(`items[${idx}].sell_price`, tempTotal)
    } else {
      setValue(`items[${idx}].sell_price`, data.sell_price)
    }

  }
  const quantity = watch(`items.${idx}.quantity`)
  const sellPrice = watch(`items.${idx}.sell_price`)
  let total = quantity * sellPrice

  const func = () => {
    const assemblyItems = getValues(`items.${idx}.assembly_items`)
    
    let tempTotal = 0
    assemblyItems.forEach((currItem, tindx) => {
      tempTotal += currItem.quantity * currItem.sell_price
    })
    setValue(`items[${idx}].sell_price`,tempTotal)

  }

  useEffect(()=>{
    setValue(`items[${idx}].order`, idx)
  }, [])


  return (
    <div key={item.uuid} className={`p-2 ${idx % 2 === 0 ? "bg-gray-100" : ""}`}>
      <div className="grid grid-cols-12 gap-y-6 gap-x-4">
        <div className="col-span-1">{idx+1}.</div>
        <div className="col-span-4">
          <AutoSuggest
            attribute="part_number"
            choices={commonContext.inventory}
            value={item.item_detail}
            onSelect={onSelect}
          />
          <textarea
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md mt-1"
            {...register(`items.${idx}.description`)}
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
            disabled={type === "a"}
          />
        </div>
        <div className="col-span-1">
          {(Math.round(total * 100) / 100).toFixed(2)}
        </div>
        <div className="col-span-1">
          <button
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={(e)=>{
              e.preventDefault()
              remove(idx)
            }}
          >
            Remove
          </button>
        </div>
      </div>
      {type === "a" && <div className="grid grid-cols-12 gap-y-6 gap-x-4 mb-1 mt-1">
        <div className="col-span-1"></div>
        <div className="col-span-4 text-blue-900 hover:text-blue-700 font-medium text-sm cursor-pointer" onClick={()=>setShowParts(!showParts)}>
          {showParts ? "Hide parts" : "Show parts"}
        </div>
      </div>}
      {type === "a" && showParts && <div className="grid grid-cols-12 gap-y-6 gap-x-4 mb-4 mt-1">
        <div className="col-span-1"></div>
        <div className="col-span-11">
          <QuotationAssemblyItemFieldArray nestedIdx={idx} type={type} callbackFunc={func} {...{ control, register, watch, setValue }}/>
        </div>
      </div>}
    </div>
  )
}

const QuotationItemFieldArray = ({ control, register, watch, setValue, getValues }) => {
  const { fields, append, remove }  = useFieldArray({
    control,
    name: "items",
    keyName: "uuid"
  })

  const onAppend = e => {
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
    <div className="pt-8 space-y-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mr-4">Items</h3>
      <div className="grid grid-cols-12 gap-y-6 gap-x-4 mb-4 font-bold">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Part Number</div>
        <div className="col-span-1">Quantity</div>
        <div className="col-span-2">Sell Price</div>
        <div className="col-span-1">Total</div>
        <div className="col-span-1">Actions</div>
      </div>
      <div>
      {fields.map((item, idx) => {
        return (
          <QuotatinItemInline key={item.uuid} {...{control, register, watch ,setValue, getValues, remove}} item={item} idx={idx}/>
        )
      })}
      </div>

      <button
        onClick={onAppend}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Add item</button>    

    </div>
  )
}

export default observer(QuotationItemFieldArray)