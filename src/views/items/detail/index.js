import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

const ItemDetail = () => {

  const location = useLocation()
  const { id } = useParams()
  const [item, setItem] = useState()
  const [view, setView] = useState("")

  useEffect(()=>{
    if (location.state?.item) {
      setItem(location.state.item)
    } else {
      // fectch(id)
      // .then(res=>{
      //   setItem(res.data)
      // })
      // .catch(res=>{
      //   console.log(res.response)
      // })
    }
  }, [id, location.state?.item])

  return (
    <div>ItemDetail</div>
  )
}

export default ItemDetail