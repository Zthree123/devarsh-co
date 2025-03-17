import React, { useState } from 'react';
import { HiEye } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [pi, setPI] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [billType, setBillType] = useState("retail");
    const [showPassword, setShowPassword] = useState(false);

    const handlePIChange = (e) => {
        setPI(e.target.value);
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        if (!pi.trim()) {
            setError("PI is required.");
            setLoading(false);
            return;
        }
    
        try {
const token = "your_secret_api_key"

            const response = await fetch("https://api.zthree.in/bizsura/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    action: "postLogin", 
                    username: pi.trim(),        
                    password: password.trim(),
                    bill_type: billType.toUpperCase(), 
                }),
            });
    
            const data = await response.json();
            console.log("API Response:", data);
            setLoading(false);
    
            if (data.status === "success") {  
                localStorage.setItem("user", JSON.stringify(data.results));
                navigate("/dashboard");
            } else {
                setError(data.Message || "Invalid username or password.");
            }
        } catch (err) {
            setLoading(false);
            setError("Network error! Please try again.");
        }
    };    

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-red-300 to-purple-500">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg shadow-purple-500">
                <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <p className="uppercase font-bold text-xl py-4">Login</p>

                    <div className="flex flex-col w-full pb-3">
                        <label htmlFor="pi" className="text-sm pb-1">Mobile Number</label>
                        <input
                            type="text"
                            id="pi"
                            value={pi}
                            onChange={handlePIChange}
                            required
                            className="border border-gray-300 outline-none rounded-md p-2 w-full focus:border-purple-500"
                        />
                    </div>

                    <div className="flex flex-col w-full pb-3">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <div className="relative flex items-center pt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border border-gray-300 outline-none rounded-md p-2 w-full focus:border-purple-500"
                            />
                            <HiEye
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gray-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full pb-3">
                        <label htmlFor="bill_type" className="text-sm">Bill Type</label>
                        <select
                            id="bill_type"
                            className="border border-gray-300 outline-none rounded-md p-2 w-full focus:border-purple-500"
                            value={billType}
                            onChange={(e) => setBillType(e.target.value)}
                        >
                            <option value="retail">RETAIL</option>
                            <option value="stockist">STOCKIST</option>
                            <option value="store_front">STORE_FRONT</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="bg-purple-500 text-white font-semibold cursor-pointer py-2 px-6 rounded-md w-full mt-4 hover:bg-purple-600"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
