import { useRef } from "react";

export const SetUpiPin = () =>{
    const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit
    if (!/^\d?$/.test(value)) return;

    // Move to next input
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-5 space-y-8 w-96 bg-white shadow-lg rounded-lg flex flex-col bg-grey-300 "
            >   
                <h2>Enter your pin </h2>
                <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3,4,5].map((i) => (
                        <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 text-center text-xl border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => (inputsRef.current[i] = el)}
                        />
                    ))}
                </div>
                
        </div>
      </div>
    </div>
}