import { useEffect } from "react"
import { useForm } from "react-hook-form"
import BeatLoader from "react-spinners/BeatLoader";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const VendorContactForm = ({ initialValues, onSubmit, isLoading }) => {

  const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm({
    defaultValues: initialValues
  })

  const submit = handleSubmit((data)=>{
    onSubmit(data)
  })
  
  useEffect(()=>{
    if (!isLoading) reset(initialValues)
  }, [isLoading])

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-6 gap-y-2 gap-x-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">email</label>
          <input
            type="text"
            {...register("email")}
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

export default VendorContactForm