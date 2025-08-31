import {useParams} from "react-router-dom"
import useFetch from "../useFetch.jsx"

const Details=()=>{

    const {data,loading,error} = useFetch("https://meet-up-backend-eight.vercel.app/meets")
    const meetId = useParams()
    let filteredData = {}
    if(!loading && data){
         filteredData = data.find(met=>met._id==meetId.id)
    }


    return(
        <div className="container py-4" >
              <a href="/" className="btn btn-danger" >Home</a>
              {!loading && data && <div className="card text-center px-2 py-2">
                    <h3>{filteredData.title}</h3>
                    <img src={filteredData.img} alt="img" />
                    <p><strong>Host:</strong> {filteredData.host}</p>
                    <p><strong>Details:</strong> {filteredData.details}</p>
                    <p><strong>Dress Code:</strong> {filteredData.dressCode}</p>
                    <p><strong>Age:</strong> {filteredData.age}</p>
                    <p><strong>Tags:</strong> {filteredData.tags.join(",")}</p>
                    <p><strong>Venue:</strong> {filteredData.venue}</p>
                    <p><strong>Date and Timings:</strong> {filteredData.dateAndTimings}</p>
                    <p><strong>Price:</strong> {filteredData.price}</p>
                    <p><strong>Speakers:</strong> {filteredData.speakers.join(",")}</p>
                    <p><strong>Event Type:</strong> {filteredData.eventType}</p>
              </div>}
        </div>
    )

}

export default Details


