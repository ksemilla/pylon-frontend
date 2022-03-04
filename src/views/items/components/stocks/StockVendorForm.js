import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useCommonContext } from "stores/common"

const StockVendorForm = ({ onSubmit, initialValues, disabled }) => {

  const commonContext = useCommonContext()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues
  })

  useEffect(()=>{
    initialValues && reset(initialValues)
  }, [initialValues, commonContext.vendors])

  const submit = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form onSubmit={submit}>
      <fieldset disabled={disabled} >
        <div className="grid grid-cols-6 gap-y-2 gap-x-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Vendor</label>
            <select
              {...register("vendor")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            >
              {commonContext.vendors.map(vendor => {
                return (
                  <option key={vendor.id} value={vendor.id} >{vendor.name}</option>
                )
              })}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">List price</label>
            <input
              type="text"
              type="number"
              step="0.01"
              min="0"
              {...register("list_price")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Submit</button>
        </div>

      </fieldset>
    </form>
  ) 
}

export default observer(StockVendorForm)