import ClientDAO from '../daos/ClientDAO.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'clave_super_secreta';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const existing = await ClientDAO.findByEmail(email);
        if (existing) {
            return res.status(409).json({ error: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const clientId = await ClientDAO.register({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado exitosamente.', clientId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
        }

        const client = await ClientDAO.findByEmail(email);
        if (!client) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
            { clientId: client.client_id, email: client.email },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7200000
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            client: {
                id: client.client_id,
                name: client.name,
                email: client.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        res.status(200).json({ message: "Logout exitoso" });

    } catch (error) {
        res.status(500).json({"error":error.message})
    }

};

