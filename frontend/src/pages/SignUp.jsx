import { useState } from "react"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"

import {useNavigate} from "react-router-dom"

import axios from "axios"

export const SignUp = () =>{

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setpassword] = useState("");
    console.log("hello")
    // for navigation use navigatehook
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div  className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"SignUp"} />
                <SubHeading label={"enter your information to create your account"}/>
                <InputBox onChange={function(e){
                    // console.log("hello")
                    // console.log(e.target.value)
                    setFirstName(e.target.value)
                }} name={"Firstname"} placeholder={"pratham"}/>
                <InputBox onChange={e=>{
                    setLastName(e.target.value);
                }} name={"Lastname"} placeholder={"raj"}/>
                <InputBox onChange={e=>{
                    setUserName(e.target.value)
                }} name={"Username"} placeholder={"kpra@gmail.com"}/>
                <InputBox onChange={e=>{
                    setpassword(e.target.value)
                }} name={"Password"} placeholder={"12345678"}/>
                <div className="pt-4">
                    <Button label={"SignUp"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:5000/api/v1/user/signup",{
                                firstName,
                                lastName,
                                userName,
                                password
                            })
                            // we get token which is store in localstorage 
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard")
                    }}/>
                </div>
                <BottomWarning label={"Already have an account"} linktext={"SignIn"} to={"/SignIn"}/>
            </div>
        </div>
    </div>
}