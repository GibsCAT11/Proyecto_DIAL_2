/**
 * Middleware de manejo de errores centralizado.
 * Captura cualquier error lanzado en la cadena de procesamiento de Express.
 * Note: Este middleware debe ser el ÚLTIMO 'app.use()' registrado en Express.
 * * @param {Error} err - Objeto de error lanzado por una operación previa (por ejemplo, con next(err)).
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para invocar el siguiente middleware en la cadena.
 */
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error:"Internal server error while updating the store."});
}