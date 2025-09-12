import mongoose from "mongoose";

export interface ISession {
    userId: mongoose.Types.ObjectId;
    token: string;
    expiresAt: Date;
    ipAddress: string;
    userAgent: string;
}