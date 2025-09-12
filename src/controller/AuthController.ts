import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { personModel } from '../model/PersonModel';
import { Session } from '../config/session.schema';

const JWT_SECRET = process.env.SIMETRIC_KEY ?? '';

export const login = async(req: Request, res: Response) => {
    const {username, password} = req.body;

    // validate user
    const person = await personModel.readUniquePerson(username);
    if(!person || person.password !== password) {
        return res.status(401).json({message: 'Invalid Credentials.'});
    }

    // create JWT with user id
    const token = jwt.sign({id: person._id}, JWT_SECRET, {expiresIn: '1h'});

    // save session on db
    const newSession = new Session({
        userId: person._id,
        token: token,
        expiresAt: new Date(Date.now() + 3600000), // expires in 1h
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
    });

    await newSession.save();

    // send token to client in a cookie HttpOnly
    res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // secure false because our environment is development, if is production = would be true
        expires: new Date(Date.now() + 3600000)
    })

    res.status(200).json({message: 'Success Login!'});
}

export const logout = async (req: Request, res: Response) => {
    try{
        // get user id by middleware authenticate
        const userId = (req as any).user.id;

        await Session.deleteOne({userId: userId});

        res.clearCookie('auth-token');

        res.status(200).json({message: 'Logout successful'});
    } catch(err){
        res.status(500).json({ message: 'Error to logout.' });
    }
}