import {AppBar} from "../components/AppBar"
import {Balance}  from "../components/Balance"
import {Users} from "../components/Users"

export const Dashboard = () =>{
    // console.log("dashboard")
    const token = localStorage.getItem("token");
    // console.log(token)
    return <div>
        <AppBar/>
        <div className="m-8">
            <Balance />
            <Users/>
        </div>
    </div>
}