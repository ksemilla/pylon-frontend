import { useEffect, useState } from "react"
import { useCustomer } from ".."
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";

const AddressForm = ({ initialValues }) => {

  const { register, handleSubmit } = useForm({
    defaultValues: initialValues
  })

  const submit = handleSubmit((data)=>{
    console.log(data)
  })

  const onDelete = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-6 gap-y-2 gap-x-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address 1</label>
          <input
            type="text"
            {...register("address1")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address 2</label>
          <input
            type="text"
            {...register("address2")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            {...register("city")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            {...register("state")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            {...register("country")}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            {...register("postal_code")}
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

const CustomerAddressInline = ({ address }) => {
  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md">
      <AddressForm initialValues={address} /> 
    </div>
  )
}

const CustomerAddresses = () => {

  const { customer } = useCustomer()

  const [addresses, setAddresses] = useState([])

  useEffect(()=>{
    if (customer) {
      setAddresses(customer.addresses.map((address) => ({...address, uuid: uuidv4()})))
    }
  }, [customer])

  const onAddAddress = e => {
    e.preventDefault()
    setAddresses(prevState => ([
      ...prevState,
      {
        uuid: uuidv4()
      }
    ]))
  }

  return (
    <div>
      <h1 className="font-medium text-2xl">{customer?.name} - {customer?.code}</h1>
      <div className="grid grid-cols-1 gap-y-2">
        {addresses?.map((address, idx) => {
          return (
            <CustomerAddressInline key={address.uuid} address={address} />
          )
        })}
      </div>
      <div className="mt-2">
        <button
          onClick={onAddAddress}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >Add New Address</button>
      </div>
    </div>
  )
}

export default CustomerAddresses