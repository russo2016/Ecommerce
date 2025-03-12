import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './newPassword.css';


function NewPassword() {
    const [password, setPassword] = useState('');
    const { email } = useParams();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/sessions/forgotPassword/${email}`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Contraseña actualizada");
                navigate("/");
            } else {
                alert(JSON.stringify(data.message));
            }
        } catch (error) {
            console.error("Error al actualizar contraseña:", error);
        }
    }

  return (
    <div className="forgotPassword-container">    
        <form id="newPasswordForm" className="newPasswordForm" onSubmit={handleSubmit}>
            <h2>Recuperar contraseña</h2>
            <div className="form-group">

            <label htmlFor="newPassword">Nueva contraseña:</label>
            <input type="password" id="newPassword" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button id="updatePassword" type="submit">Cambiar contraseña</button>
    </form>
  </div>
  );
}

export default NewPassword;