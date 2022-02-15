import { useForm } from "react-hook-form"

const LoginForm = ({ onSubmit }) => {

  const { register, handleSubmit } = useForm()

  const submit = handleSubmit(data=>{
    onSubmit(data)
  })

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-6 gap-y-2 gap-x-2">
        <div className="col-span-6">
          <label
            className="block text-sm font-medium text-gray-700"
          >Email</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
        <div className="col-span-6">
          <label
            className="block text-sm font-medium text-gray-700"
          >Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
          />
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"  
        >Login</button>
      </div>
    </form>
  )
}

export default LoginForm