import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react'
import useFetch from "./useFetch"

function App() {
  
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [tag , setTags] = useState("")

  const {data,loading,error} = useFetch("https://meet-up-backend-eight.vercel.app/meets")
  let filteredData = data? data : []
  if( !loading && search!=""){
       filteredData = search!=""?data.filter((dat)=> dat.title==search  ):data
  }

  if(!loading && tag!=""){
     filteredData = tag!=""? data.filter((dat)=>dat.tags.includes(tag)):data
     console.log(filteredData)
  }

  if(!loading && type!=""){
     filteredData = type!=""?data.filter((dat)=>dat.eventType==type) :data
  }

  return (
    <>
      <header className="text-center  text-danger py-3"  >
         <h1  className="Display-3">MeetUp</h1>
         <hr />
      </header>
      <main className="px-2 ">
          <input type="text" placeholder="Search By Title " id="search" className="form-control" onChange={(event)=>setSearch(event.target.value)} />
          <input type="text" placeholder="Search By Tags" id="tags" className="form-control" onChange={(event)=>setTags(event.target.value)} />
          <select id="eventType"  className="form-select" onChange={(event)=>setType(event.target.value)}  >
              <option >Search By Type</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
          </select>
          <div className="  py-4" style={{width:"1000px",paddingLeft:"500px"}}>
             { !loading && filteredData.map((data)=>(
                <div className="card px-3 py-3 my-3 ">
                      <img src={data.img} alt={`img${data.title}`} />
                      <h4>{data.title}</h4>
                      <p>{data.dateAndTimings} <br /> <strong>{data.eventType}</strong> </p>
                      <a href={`meet/${data._id}`}  className="btn btn-primary">View Details</a>
                </div>
               ))
             }
          </div>
      </main>
    </>
  )
}

export default App
