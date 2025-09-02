import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState } from 'react'
import useFetch from "./useFetch"

function App() {
  
  const [search, setSearch] = useState("")
  const [type, setType] = useState("Both")
  const [tag , setTags] = useState("")

  const {data,loading,error} = useFetch("https://meet-up-backend-eight.vercel.app/meets")
  let filteredData = data? data : []
  if( !loading && search!=""){
       filteredData = search!=""?data.filter((dat)=> dat.title.includes(search) || dat.title.includes(search.charAt(0).toLocaleUpperCase())  ):data
  }

  if(!loading && tag!=""){
     filteredData = tag!=""? data.filter((dat)=>dat.tags.includes(tag) || dat.tags.includes(tag.toUpperCase()) || dat.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
 ):data
     console.log(filteredData)
  }

  if(!loading && type!="Both"){
     filteredData = type!="Both"?data.filter((dat)=>dat.eventType==type) :data
  }

  return (
    <>
      <header className="text-center  text-danger py-3"  >
         <h1  className="Display-3">MeetUp</h1>
         <hr />
      </header>
      <main className="px-2 ">
          <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                    <input type="text" placeholder="Search By Title " id="search" className="form-control" onChange={(event)=>setSearch(event.target.value)} />
              </div>
              <div className="col-12 col-md-4">
                    <input type="text" placeholder="Search By Tags" id="tags" className="form-control" onChange={(event)=>setTags(event.target.value)} />
              </div>
              <div className="col-12 col-md-4 ">
                       <select id="eventType"  className="form-select" onChange={(event)=>setType(event.target.value)}  >
                       <option value="Both" >Both</option>
                       <option value="Offline">Offline</option>
                       <option value="Online">Online</option>
                       </select>
              </div>
          </div>  
          <div className=" row py-4 mx-3" >
             { !loading && filteredData.map((data)=>(
                 <div className="col-12 col-sm-6 col-md-4 mb-4 ">
                       <div className="  card  px-3 py-3 my-3 center-align " style={{height:"500px"}} >
                          <img src={data.img} alt={`img${data.title}`} height={"300px"}  />
                          <h4>{data.title}</h4>
                          <p>{new Date(data.dateAndTimings).toLocaleTimeString()}    {new Date(data.dateAndTimings).toLocaleDateString()} <br /> <strong>{data.eventType}</strong> </p>
                          <a href={`meet/${data._id}`}  className="btn btn-primary">View Details</a>
                      </div>
                 </div>
                
               ))
             }
             {
               !loading && filteredData.length==0 && <p>No Data found</p>
             }
          </div>
      </main>
    </>
  )
}

export default App
