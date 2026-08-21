import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useClerk, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(false);
const navigate=useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { getToken } = useAuth();
    const [image,setImage]=useState(false)
    const {isSignedIn}=useUser()

    const {openSignIn}=useClerk()

    const [resultImage,setResultImage]=useState(false)

    const loadCreditsData = async () => {
        try {
           
         
            const token = await getToken();
            const { data } = await axios.get(
                `${backendUrl}/api/user/credits`,
                {
                    headers: {
                        token,
                    },
                }
            );

          
            if (data.success) {
                setCredit(data.credits);
             
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // remove bg function
    const removeBg=async(image)=>{
try {
    if(!isSignedIn){
        return openSignIn()
    }
    setImage(image)
    setResultImage(false)
    navigate('/result')


     
} catch (error) {
    console.log(error)
    toast.error(error.message)
}
    }

    const value = {
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,image,setImage,removeBg
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;