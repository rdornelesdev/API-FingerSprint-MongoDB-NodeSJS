import mongoose, {Document, Schema} from 'mongoose';
import { ISession } from '../interface/InterfaceSession';

const SessionSchema: Schema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'Person', required: true},
    token: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    ipAddress: {type: String, required: true},
    userAgent: {type: String, required: true}
});

export const Session = mongoose.model<ISession>('Session', SessionSchema);