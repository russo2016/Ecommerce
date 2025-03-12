import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

function SignUp(){
    const [first_name,setFirst_name] = useState("");
    const [last_name,setLast_name] = useState("");
    const [age,setAge] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const baseURL = import.meta.env.VITE_API_BASE_URL
    
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseURL}/sessions/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                age,
                email,
                password,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Usuario creado exitosamente");
            navigate("/");
        } else {
            alert("Error: " + JSON.stringify(data.error));
        }
    }


    return(
    <div className="login-container">
        <form id="signup-form" className="signup-form" onSubmit={onSubmit}>
            <h2>Crea tu usuario</h2>
            <div className="form-group">

            <label htmlFor="first_name">Nombre:</label>
            <input type="text" id="first_name" name="first_name" required value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
            </div>
            <div className="form-group">

            <label htmlFor="last_name">Apellido:</label>
            <input type="text" id="last_name" name="last_name" required value={last_name} onChange={(e) => setLast_name(e.target.value)}/>
            </div>
            <div className="form-group">

            <label htmlFor="age">Edad:</label>
            <input type="number" id="age" name="age" required value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div className="form-group">

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

            </div>
            <button id="signup" type="submit">Crear</button>
            <button className="login-button" id="login" type="button" onClick={() => navigate("/")}>Iniciar sesión</button>
        </form>
    </div>
    )
}

export default SignUp;