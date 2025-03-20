import { getUser } from "../utils/getUser.js";

export async function isAdminMiddleware(req, res, next) {
    const user = await getUser(req.headers.authorization);
    if (!user || user.role !== 'ADMIN') return res.status(403).send('FORBIDDEN');
    next();
}

export async function isUserMiddleware(req, res, next) {
    const user = await getUser(req.headers.authorization);
    if (!user) return res.status(403).send('FORBIDDEN');
    next();
}