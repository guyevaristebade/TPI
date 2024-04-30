import jwt from 'jsonwebtoken'

export const authenticated = async (req, res, next) => {
    let token = req.cookies['token']

    if (!token) {
        token = req.headers['bearer']

        if (token === undefined) {
            return res.status(401).send('Unauthorized')
        }
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY || '')
        //console.log(req)
        next()
    } catch (err) {
        return res.status(401).send('Unauthorized')
    }
}
