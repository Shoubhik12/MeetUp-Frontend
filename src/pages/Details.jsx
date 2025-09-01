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
              <a href="/" className="btn btn-danger" >Home</a><br /><br />
              {!loading && data && <div className="card  px-2 py-2">
                    <h3>{filteredData.title}</h3>
                    <img src={filteredData.img} alt="img" height={"500px"} />
                    <p><strong>Host:</strong> {filteredData.host}</p>
                    <p><strong>Details:</strong> {filteredData.details}  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    <p><strong>Dress Code:</strong> {filteredData.dressCode}</p>
                    <p><strong>Age:</strong> {filteredData.age}</p>
                    <p><strong>Tags:</strong> {filteredData.tags.join(",")}</p>
                    <p><strong>Venue:</strong> {filteredData.venue}</p>
                    <p><strong>Date and Timings:</strong> {new Date(filteredData.dateAndTimings).toLocaleTimeString()}    {new Date(filteredData.dateAndTimings).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> {filteredData.price}</p>
                    <p><strong>Speakers:</strong></p>
                    <div className="row px-2">
                        {filteredData.speakers.map(dat=><div className="col my-1" >
                         <img src="https://placehold.co/300x200"  alt="speakers" />
                         <p>{dat}</p>                
                    </div>)}  
                    </div>

                    <p><strong>Event Type:</strong> {filteredData.eventType}</p>
              </div>}
        </div>
    )

}

export default Details


