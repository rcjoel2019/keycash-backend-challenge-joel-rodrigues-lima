import {
  Between,
  FindCondition,
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual
} from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Property } from "../entity/Property";

export class PropertyController {
  private propertyRepository = getRepository(Property);

  public minMaxFilter(min, max, name) {
    if (min != undefined || max != undefined) {
      const obj = {};
      obj[name] =
        min != undefined && max == undefined
          ? MoreThanOrEqual(parseInt(min.toString()))
          : Between(
              min == undefined ? 0 : parseInt(min.toString()),
              parseInt(max.toString())
            );
      return obj;
    }
  }

  async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Property[]> {
    let filter: any = {};
    filter = {
      ...filter,
      ...this.minMaxFilter(
        request.query.minRoom,
        request.query.maxRoom,
        "room"
      ),
      ...this.minMaxFilter(
        request.query.minMeter,
        request.query.maxMeter,
        "square_meters"
      ),
      ...this.minMaxFilter(
        request.query.minPark,
        request.query.maxPark,
        "parking_space"
      )
    };

    return this.propertyRepository.find(filter);
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
