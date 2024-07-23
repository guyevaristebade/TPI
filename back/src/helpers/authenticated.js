import jwt from 'jsonwebtoken';
export const authenticated = async (req, res, next) => {
    try {
        let token = req.cookies['token-auth'];

        if (!token) {
            const authHeader = req.headers['authorization'];
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            } else {
                return res.status(401).send('Unauthorized');
            }
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired');
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).send('Invalid token');
        } else {
            return res.status(500).send('Internal server error');
        }
    }
};

/*
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
*/
