import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Session } from "../config/session.schema";

const JWT_SECRET = process.env.SIMETRIC_KEY ?? '';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth-token'];
    if(!token) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as {id: string}; // using id because in AuthController, in the creation of the jwt in the login function, im insert an object that, so, this object contains the id prop!

        // session validate in db
        const session = await Session.findOne({
            userId: decodedToken.id,
            token: token,
            expiresAt: { $gt: new Date() } // session not expired ($gt = great than, default of the mongodb)
        })

        if(!session) {
            return res.status(401).json({ message: 'Invalid session or expired.' });
        }

        if(session.ipAddress !== req.ip || session.userAgent !== req.headers['user-agent']) {
            await Session.deleteOne({_id: session._id}); // revokes the session
            return res.status(401).json({message: 'Invalid Session.'});
        }

        // renew the session and continue
        session.expiresAt = new Date(Date.now() + 3600000);
        await session.save();

        (req as any).user = decodedToken; // add user to request
        next();
    } catch(err) {
        return res.status(401).json({message: 'Token Inválido'});
    }
}
