import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/sessions/login", {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Inicio de sesión exitoso");
                navigate("/products");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                    <h2>Iniciar sesión</h2>
                    <div className="form-group">
                        <label htmlFor="email">Usuario:</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button id="login" type="submit">Ingresar</button>
                </form>
                <button className="forgotPassword" onClick={()=>navigate("/forgotPassword")}>Olvide la contraseña</button>
                <button className="signUp" onClick={()=>navigate("/signup")}>Crear usuario</button>

            </div>
        </div>
    );
}

export default Login;
