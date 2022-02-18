const Home = () => {
  return (
    <div>
      {Array.from(Array(10).keys()).map(()=>(
        <p className="p-24">a</p>
      ))}
    </div>
  )
}

export default Home