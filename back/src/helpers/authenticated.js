import jwt from 'jsonwebtoken';

export const authenticated = async (req, res, next) => {
    let token = req.cookies['token-auth'];

    if (!token) {
        token = req.headers['Authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send('Unauthorized');
        }
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY || '');
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
};
