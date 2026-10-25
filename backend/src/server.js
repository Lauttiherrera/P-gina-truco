const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./configs/db");
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// ===== RUTA DE PRUEBA =====
app.get("/prueba", async (req, res) => {
try {
const [rows] = await pool.query(
"SELECT id, nombre, email FROM usuarios"
);
res.json({
mensaje: "Conexión exitosa a la base de datos",
usuarios: rows
});
} catch (error) {
res.status(500).json({
error: error.message
});
}
});
// ===== REGISTRAR USUARIO =====
app.post("/usuarios", async (req, res) => {
try {
const { nombre, email, password } = req.body;
if (!nombre || !email || !password) {
return res.status(400).json({
error: "Todos los campos son obligatorios"
});
}
// Verificar si ya existe el email
const [usuariosExistentes] = await pool.query(
"SELECT id FROM usuarios WHERE email = ?",
[email]
);
if (usuariosExistentes.length > 0) {
return res.status(409).json({
error: "Ya existe un usuario con ese email"
});
}
// Encriptar contraseña
const passwordHash = await bcrypt.hash(password, 10);
// Guardar usuario
const sql = `INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)`;
const [result] = await pool.query(
sql,
[nombre, email, passwordHash]
);
res.status(201).json({
mensaje: "Usuario registrado con éxito",
id: result.insertId
});
} catch (error) {
console.error(error);
res.status(500).json({
error: error.message
});
}
});
// ===== LOGIN =====
app.post("/login", async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) {
return res.status(400).json({
error: "Email y contraseña son obligatorios"
});
}
// Buscar usuario por email
const [usuarios] = await pool.query(
`
FROM usuarios
WHERE email = ?`,
[email]
);
if (usuarios.length === 0) {
return res.status(401).json({
error: "Email o contraseña incorrectos"
});
}
const usuario = usuarios[0];
// Usuario viejo sin contraseña
if (!usuario.password_hash) {
return res.status(401).json({
error: "Este usuario todavía no tiene contraseña"
});
}
// Comparar contraseña escrita con el hash
const passwordCorrecta = await bcrypt.compare(
password,
usuario.password_hash
);
if (!passwordCorrecta) {
return res.status(401).json({
error: "Email o contraseña incorrectos"
});
}
res.json({
mensaje: "Inicio de sesión correcto",
usuario: {
id: usuario.id,
nombre: usuario.nombre,
email: usuario.email
}
});
} catch (error) {
console.error(error);
res.status(500).json({
error: error.message
});
}
});
// ===== ENCENDER SERVIDOR =====
app.listen(3000, () => {
console.log("Servidor backend corriendo en http://localhost:3000");
});