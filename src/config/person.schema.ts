import mongoose from "mongoose";
import {IPerson} from '../interface/InterfacePerson';

export const PersonSchema = new mongoose.Schema<IPerson>({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

