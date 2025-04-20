import axios from "axios";
import { useEffect, useState } from "react"

export const Balance = () =>{
    const [value,setValue] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                // console.log("Token:", token);

                const res = await axios.get("http://localhost:5000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                // console.log("Response from backend:", res.data);
                
                var amount = res.data;
                // console.log(typeof amount.balance)
                amount = Math.trunc(Number(amount.balance))
                // console.log(amount)
                setValue(amount); // Update state with the balance value
            } catch (err) {
                // console.error("Error fetching balance:", err.response?.data || err.message);
            }
        };

        fetchBalance();
    }, []);
    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance : 
        </div>
        <div className="font-semibold ml-4 text-lg">
           Rs {value}
        </div>
    </div>
}