import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Property {
  @PrimaryGeneratedColumn() id: number;

  @Column("int") room: number = undefined;

  @Column("int") square_meters: number = undefined;

  @Column("bool") next_to_subway: boolean = undefined;

  @Column("int") parking_space: number = undefined;

  @Column("int") bathroom: number = undefined;

  @Column("int") floor: number = undefined;

  @Column("bool") furnished: boolean = undefined;

  @Column("double") iptu: number = undefined;

  @Column() address: string = undefined;

  @Column("double") condominium_fee: number = undefined;

  @Column("double") price: number = undefined;

  @Column() phone: string = undefined;

  @Column() email: string = undefined;
}
