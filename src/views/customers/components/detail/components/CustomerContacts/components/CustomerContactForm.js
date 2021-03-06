import { createCustomerContact, updateCustomerContact } from "api/customers"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"


const CustomerContactForm = ({ initialValues }) => {

  const { id } = useParams()

  const { register, handleSubmit } = useForm({
    defaultValues: initialValues
  })

  const submit = handleSubmit((data)=>{
    if (initialValues?.id) {
      updateCustomerContact(id, data.id, data)
      .then(res=>{
        console.log(res.data)
      })
      .catch(res=>{
        console.log(res.response)
      })
    } else {
      createCustomerContact(id, data)
      .then(res=>{
        console.log(res)
      })
      .catch(res=>{
        console.log(res.response)
      })
    }
  })

  const onDelete = e => {
    e.preventDefault()
  }

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
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Submit</button>
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={onDelete}
        >Delete</button>
      </div>

    </form>
  )
}

export default CustomerContactForm