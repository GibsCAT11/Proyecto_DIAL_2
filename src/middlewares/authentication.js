import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json( { error: "Token no fue proporcionado."} )
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);

        req.studentId = decoded.studentId;

        next();

    } catch (err){
        res.status(401).json( { error: "Token Iválido." } )
    }

}