import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ShortenedUrlManagement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalUrl: string;

    @Column({unique: true})
    shortenedUrl: string;
}
