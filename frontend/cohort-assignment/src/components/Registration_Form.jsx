import {useState} from "react";
import axios from "axios";

function Register(){
    const [formData, setFormData]=useState({
        name="",
        registration_no:"",
        email:"",
        password:"",
        age:""
    })
}
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/user",formData);
         setFormData({
                name: "",
                registration_no: "",
                email: "",
                password: "",
                age: ""
            });
        } 
        catch (error) {
            alert("Something went wrong");
        }
    };
     return (
         <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="registration_no"
                placeholder="Registration Number"
                value={formData.registration_no}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
            />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;