import { useState } from "react"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"

import {useNavigate} from "react-router-dom"

import axios from "axios"
// import { response } from "express"

export const SignIn = () =>{

    const [username,setUserName] = useState("");
    const [password,setpassword] = useState("");

    // for navigation use navigatehook
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div  className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"SignIn"} />
                <SubHeading label={"enter your information to access your account"}/>
                
                <InputBox onChange={e=>{
                    setUserName(e.target.value)
                }} name={"Username"} placeholder={"kpra@gmail.com"}/>
                <InputBox onChange={e=>{
                    setpassword(e.target.value)
                }} name={"Password"} placeholder={"12345678"}/>

                <div className="pt-4">
                    <Button label={"SignIn"} onClick={async ()=>{
                        try{
                            const response = await axios.post("http://localhost:5000/api/v1/user/signin",{
                                username,
                                password
                            })
                            // console.log(response)
                            
                            localStorage.setItem("token",response.data.token);
                            navigate("/dashboard")
                        }
                        catch(err){
                            // console.error(err);
                            navigate("/signup")
                        }
                        
                    }}/>
                </div>
                <BottomWarning label={"Dont have an account"} linktext={"SignUp"} to={"/SignUp"}/>
            </div>
        </div>
    </div>
}