import { useEffect, useState } from "react"
import { server_calls } from "../api/server"

export const useGetData = () => {
    const [ carData, setData ] = useState<[]>([])
    
    // contact data is result of server call

    const [profileData, setProfileData] = useState({
      first_name:"",
      last_name:"",
      token:"",
      email:"",
      username:"",
      });
    
    
    async function handleDataFetch(){
      const result = await server_calls.get();
      setData(result), setProfileData(result)
    
  }
  
  useEffect(() => {
    fetch("/signup").then(
      (res) => res.json()
      ).then((profileData) => {
          setProfileData({
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            token: profileData.token,
            email: profileData.email,
            username: profileData.username
          });
        })
  }, []);

    // useEffect on mount
    useEffect( () => {
        handleDataFetch();
    }, [])
    
    // without the empty array at the end of useEffect, every change will refresh the page
    //  with the empty array it will only occur on mount
    
    // If a specific component is identified, it will watch for changes only with that component

    return { carData, getData:handleDataFetch, profileData, getProfileData:handleDataFetch }
}