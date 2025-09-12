import {Request, Response} from 'express';
import { personModel } from '../model/PersonModel';
import mongoose from 'mongoose';

// create user
export const createPerson = async (req: Request, res: Response) => {
    const personData = req.body;

    try{
        const modelCreate = personModel.createUser(personData);
        return res.status(201).json({message: 'User create w/ success!'});
    } catch(err) {
        return res.json({message: "Error to create user. Try again later."});
    }
}

// read users
export const readPersons = async (req: Request, res: Response) => {
    const personData = req.body;
    
    try{
        const modelRead = await personModel.readPerson();
        return res.json(modelRead);
    } catch(err) {
        return res.json({message: 'Error to get data.'})
    }
}

// update users
export const updatePerson = async(req: Request, res: Response) => {
    const id = req.params.id ?? '';
    const updateData = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid ID'});
    }

    try{
        const updatedPerson = await personModel.updatePerson(id, updateData);

        if(!updatePerson) {
            return res.status(404).json({error: "Person not found"});
        }

        res.status(200).json({message: "Person update w/ success"})
    } catch(err) {
        return res.status(500).json({message: "Error to update person"});
    }
}

// delete user
export const deleteUser = async(req: Request, res: Response) => {
    const id = req.params.id as string;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid ID to delete"});
    }

    try{
        const deletedUser = await personModel.deleteUser(id);

        if(!deletedUser) {
            return res.status(400).json({message: "User not deleted"});
        }

        return res.status(200).json({message: "User deleted."});

    } catch(err) {
        return res.status(500).json({message: "Error to delete user."});
    }
}

