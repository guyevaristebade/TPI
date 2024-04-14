import jwt from 'jsonwebtoken'
import { secret } from './secret.js'

export const authenticated = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        ;

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        console.error(err);
        res.status(401).send('Unauthorized');
    }
}
