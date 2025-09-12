import mongoose from "mongoose";
import { PersonSchema } from "../config/person.schema";
import { IPerson } from "../interface/InterfacePerson";

export const PersonMongo = mongoose.model<IPerson>("Person", PersonSchema);

export class PersonModel {
  // crate user
  async createUser(personData: IPerson): Promise<IPerson> {
    const createPerson = new PersonMongo(personData);
    return await createPerson.save();
  }

  // read user
  async readPerson(): Promise<IPerson[]> {
    const readPersonData = await PersonMongo.find().lean();
    return readPersonData;
  }

  // findById
  async readUniquePerson(username: string) {
    const readUnique = await PersonMongo.findOne({username: username});
    return readUnique;
  }

  // update user
  async updatePerson(
    id: string,
    personData: Partial<IPerson>
  ): Promise<IPerson | null> {
    const updatedPerson = await PersonMongo.findByIdAndUpdate(id, personData, {
      new: true, // retorna o documento atualizado
    });
    return updatedPerson;
  }

  // delete user
  async deleteUser(id: string): Promise<IPerson | null> {
    try{
        const deletedPerson = await PersonMongo.findByIdAndDelete(id).lean();
        return deletedPerson;
    } catch(err) {
        console.error(err);
        return null;
    }
  }


}



export const personModel = new PersonModel();
