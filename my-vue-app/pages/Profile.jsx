import axios from 'axios'
import React ,{useState ,useEffect}from 'react'
import { Link } from 'react-router-dom'
const Profile = (props) => {
const [Biodata, setBiodata] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(Date.now());
const handleFetchProfile=async()=>{
  try {
    const res=await axios.get(`http://localhost:3001/user/${props.AdminName}/profile`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      if (!res.data) return console.log("Profile fetch failed")
        setBiodata(res.data)
    console.log("Profile fetch successful")

  } catch (error) {
    console.log("profile Fetch failed "+error)
  }
}
useEffect(() => {
  handleFetchProfile()

  
}, [])


  return (
    <div>
      <ul>
        <button onClick={handleFetchProfile}>Fetch</button>
        {!Biodata && <div>loading..</div>}
       {Biodata && (
        <li key={Biodata._id}>
          <div>{Biodata.username}</div>
          <div>{Biodata.email}</div>
          <div>{Biodata.position}</div>
          <div>{Biodata.phone}</div>
          <div>{Biodata.address}</div>
          <img src={Biodata.profileImage} alt="" />
        </li>

       )}
      </ul>
      <Link to={"/profileForm"}> Form</Link>

    </div>
  )
}

export default Profile
