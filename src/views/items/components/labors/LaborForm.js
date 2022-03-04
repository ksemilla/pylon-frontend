import { useEffect } from "react"
import { useForm } from "react-hook-form"
import BeatLoader from "react-spinners/BeatLoader";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const LaborForm = ({ initialValues, onSubmit, isLoading }) => {

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
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
        <div className="grid grid-cols-6 gap-y-2 gap-x-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              disabled
              {...register("type")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            >
              <option value="l">Labor</option>
            </select>
          </div>
          {/* <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">status</label>
            <input
              type="text"
              {...register("status")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            />
          </div> */}
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
            <select
              {...register("unit")}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
            >
              <option value="e">Each</option>
              <option value="l">Length</option>
            </select>
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

        <div className="mt-3 flex justify-between">
        <button
          type="submit"
          className={classNames(
            "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            isDirty && !isLoading ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-600"
          )}
          disabled={!isDirty || isLoading}
        >{isLoading ? <BeatLoader size={8} color="white" /> : "Submit"}</button>
      </div>

    </form>
  ) 
}

export default LaborForm