import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Property } from "../entity/Property";
import { validate } from "class-validator";

export class PropertyController {
  private propertyRepository = getRepository(Property);

  async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property[]> {
    return this.propertyRepository.find();
  }
  async show(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property> {
    const propertyToShow = await this.propertyRepository.findOne(
      request.params.id
    );
    if (propertyToShow) return propertyToShow;
    response.status(204);
    response.send(`No property with ID ${request.params.id}`);
  }
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property> {
    let p = new Property();

    p = { ...p, ...request.body };
    console.log(p);
    const hasEmptyFields =
      Object.entries(p).filter(([k, v]) => v == undefined || v == null).length >
      0;

    if (!hasEmptyFields) return this.propertyRepository.save(request.body);
    response.status(406);
    response.send("Property with invalid field");
  }
  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property> {
    let propertyToUpdate = await this.propertyRepository.findOne(
      request.params.id
    );
    if (propertyToUpdate) {
      propertyToUpdate = { ...propertyToUpdate, ...request.body }; //ECMAScript 2018 Object spread, see:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      return this.propertyRepository.save(propertyToUpdate);
    }
    response.status(204);
    response.send(`No property with ID ${request.params.id}`);
  }
  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property> {
    const propertyToRemove = await this.propertyRepository.findOne(
      request.params.id
    );
    if (propertyToRemove != undefined)
      return await this.propertyRepository.remove(propertyToRemove);
    response.status(204);
    response.send(`No property with ID ${request.params.id}`);
  }
}
