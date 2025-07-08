// // import { createContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // export const AppContext = createContext();

// // const AppContextProvider = (props) => {
// //   const currencySymbol = "$";

// //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //   const [doctors, setDoctors] = useState([]);

// //   const value = {
// //     doctors,
// //     currencySymbol,
// //   };

// //   const getDoctorsData = async (req, res) => {
// //     try {
// //       const { data } = await axios.get(backendUrl + "/api/doctor/list");
// //       if (data.success) {
// //         setDoctors(data);
// //       } else {
// //         toast.error(error.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     getDoctorsData();
// //   }, []);

// //   return (
// //     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
// //   );
// // };

// // export default AppContextProvider;


// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {


//   const currencySymbol = "$";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [doctors, setDoctors] = useState([]);

//   const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)



//   const getDoctorsData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/doctor/list");
//       setDoctors(data.doctors); // assuming backend sends array of doctors directly
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message || "Failed to fetch doctors");
//     }
//   };




//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   const value = {
//     doctors,
//     currencySymbol,
//     token,setToken,
//     backendUrl
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;


// AppContext.js

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);

  const [userData,setUserData]=useState(false)

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch doctors");
    }
  };


  const loadUserProfileData=async(req,res)=>{
    try {
      
      const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
      if(data.success){
        setUserData(data.userData)
      }
      else{
        toast.error(data.message)
      }


    } catch (error) {
       console.log(error);
      toast.error(error.message || "Failed to fetch doctors");
    }
  }

  useEffect(() => {
    getDoctorsData();
  }, []);


  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }
    else{
      setUserData(false)
    }
  },[token])

  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
