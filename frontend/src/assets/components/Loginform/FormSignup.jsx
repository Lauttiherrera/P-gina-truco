const manejarEnvio = async (e) => {
e.preventDefault();
try {
const respuesta = await fetch(
"http://localhost:3000/usuarios",
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ nombre, email, password }),
}
);
const datos = await respuesta.json();
if (respuesta.ok) {
setMensaje(datos.mensaje);
setNombre("");
setEmail("");
setPassword("");
} else {
setMensaje("Error: " + datos.error);
}
} catch (error) {
setMensaje("Error de conexión con el servidor");
}
};
import React, { useState } from "react";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import google from "../../assets/google.svg";
import SocialButton from "./styled/SocialButton";
import BrandButton from "./styled/BrandButton";
import SlidingForm from "./styled/slidingform.js";
const FormSignup = () => {
const [nombre, setNombre] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [mensaje, setMensaje] = useState("");
const manejarEnvio = async (e) => {
e.preventDefault();
try {
const respuesta = await fetch(
"http://localhost:3000/usuarios",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
nombre,
email,
password
}),
}
);
const datos = await respuesta.json();
if (respuesta.ok) {
setMensaje(datos.mensaje);
setNombre("");
setEmail("");
setPassword("");
} else {
setMensaje("Error: " + datos.error);
}
} catch (error) {
setMensaje("Error de conexión con el servidor");
}
};
return (
<SlidingForm>
<h1>
Create
<br />
Account
</h1>
<div>
<SocialButton>
<img src={facebook} alt="Facebook" />
</SocialButton>
<SocialButton>
<img src={linkedin} alt="LinkedIn" />
</SocialButton>
<SocialButton>
<img src={google} alt="Google" />
</SocialButton>
</div>
<p>or register with your email</p>
<form onSubmit={manejarEnvio}>
<input
type="text"
placeholder="Name"
value={nombre}
onChange={(e) =>
setNombre(e.target.value)}
required
/>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) =>
setPassword(e.target.value)}
required
/>  
<BrandButton type="submit">
Sign up
</BrandButton>
</form>
{mensaje && (
<p
style={{
marginTop: "12px",
fontSize: "13px",
}}
>
{mensaje}
</p>
)}
</SlidingForm>
);
};
export default FormSignup;