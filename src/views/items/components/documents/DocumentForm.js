import { useEffect } from "react"
import { useForm } from "react-hook-form"

const DocumentForm = ({ disabled, initialValues, onSubmit }) => {

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues
  })

  useEffect(()=>{
    initialValues && reset(initialValues)
  }, [initialValues])

  const submit = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form onSubmit={submit}>
      <fieldset disabled={disabled} >
        <div className="grid grid-cols-6 gap-y-2 gap-x-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              {...register("type")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">status</label>
            <input
              type="text"
              {...register("status")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Part number</label>
            <input
              type="text"
              {...register("part_number")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...register("description")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              {...register("unit")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="text"
              type="number"
              step="0.01"
              min="0"
              {...register("quantity")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">In order</label>
            <input
              type="text"
              type="number"
              step="0.01"
              min="0"
              {...register("in_order")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
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
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Sell price</label>
            <input
              type="text"
              type="number"
              step="0.01"
              min="0"
              {...register("sell_price")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Submit</button>
        </div>

      </fieldset>
    </form>
  ) 
}

export default DocumentForm