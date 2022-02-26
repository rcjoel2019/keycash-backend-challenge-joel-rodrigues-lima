import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Property } from "../entity/Property";

export class PropertyController{

    private propertyRepository = getRepository(Property);

    async all(request: Request, response: Response, next: NextFunction): Promise<Property[]>{
        return this.propertyRepository.find();
    }
    async one(request: Request, response: Response, next: NextFunction): Promise<Property>{
        return this.propertyRepository.findOne(request.params.id);
    }
    async save(request: Request, response: Response, next: NextFunction): Promise<Property>{
        return this.propertyRepository.save(request.body);
    }
    async update(request: Request, response: Response, next: NextFunction): Promise<Property>{
        let propertyToUpdate = await this.propertyRepository.findOne(request.params.id);
        propertyToUpdate = {...propertyToUpdate, ...request.body}; //ECMAScript 2018 Object spread, see:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        return this.propertyRepository.save(propertyToUpdate);
    }
    async remove(request: Request, response: Response, next: NextFunction): Promise<Property>{
        let propertyToRemove = await this.propertyRepository.findOne(request.params.id);
        return await this.propertyRepository.remove(propertyToRemove);
    }

}