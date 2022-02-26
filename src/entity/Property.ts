import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Property{
    @PrimaryGeneratedColumn()
    id:number;

    @Column("int")
    room:number;

    @Column("int")
    square_meters:number;

    @Column("bool")
    next_to_subway:boolean;

    @Column("int")
    parking_space:number;

    @Column("int")
    bathroom:number;

    @Column("int")
    floor:number;

    @Column("bool")
    furnished:boolean;

    @Column("double")
    iptu:number;

    @Column()
    address:string;

    @Column("double")
    condominium_fee:number;

    @Column("double")
    price:number;

    @Column()
    phone:string;

    @Column()
    email:string;
}