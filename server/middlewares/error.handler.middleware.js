export const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error Middleware:", err);

    const status = err.status || 500;

    res.status(status).json({
        status: "error",
        error: err.message || "Internal Server Error",
    })
}