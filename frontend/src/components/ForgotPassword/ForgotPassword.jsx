import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword(){
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/sessions/forgotPassword`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert(`Mail enviado a ${email}`);
                navigate("/");
            } else {
                console.error("Error en forgotPassword:", response.json());
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };


    return (
    <div className="forgotPassword-container">
        <form id="forgotPasswordForm" className="forgotPasswordForm" onSubmit={handleSubmit}>
            <h2>Recuperar contraseña</h2>
            <div className="form-group">
        
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button id="recoverPassword" type="submit">Recuperar</button>
        </form>
      </div>
    )
}

export default ForgotPassword;