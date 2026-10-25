import React, { useState } from "react";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import google from "../../assets/google.svg";
import SocialButton from "./styled/SocialButton";
import BrandButton from "./styled/BrandButton";
import SlidingForm from "./styled/slidingform.js";
const FormLogin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [mensaje, setMensaje] = useState("");
const manejarLogin = async (e) => {
e.preventDefault();
try {
const respuesta = await fetch(
"http://localhost:3000/login",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
email,
password
})
}
);
const datos = await respuesta.json();
if (respuesta.ok) {
setMensaje(
"Bienvenido " + datos.usuario.nombre
);
setEmail("");
setPassword("");
} else {
setMensaje(
"Error: " + datos.error
);
}
} catch (error) {
setMensaje(
"Error de conexión con el servidor"
);
}
};   
}
return (
<SlidingForm>
<h1>Sign in</h1>
<div>
<SocialButton>
<img
src={facebook}
alt="Facebook"
/>
</SocialButton>
<SocialButton>
<img
src={linkedin}
alt="LinkedIn"
/>
</SocialButton>
<SocialButton>
<img
src={google}
alt="Google"
/>
</SocialButton>
</div>  
<p>
or use your account
</p>
<form onSubmit={manejarLogin}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)
}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) =>
setPassword(e.target.value)
}
required
/>
<a href="#">
Forgot your password?
</a>
<BrandButton type="submit">
Sign in
</BrandButton>
</form>
{mensaje && (
<p
style={{
marginTop: "12px",
fontSize: "13px"
}}
>
{mensaje}
</p>
)}
</SlidingForm>
);
export default FormLogin;
