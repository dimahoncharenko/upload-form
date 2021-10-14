import { Entity, Column, PrimaryColumn, BaseEntity, BeforeInsert } from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "photos" })
export class PhotoEntity extends BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    id: string;

    @Column({ length: 100, nullable: true })
    url: string;

    @Column({ type: "date" })
    createdAt: Date;

    @Column({ type: "varchar", length: 20 })
    extname: string;

    @Column({ type: "enum", enum: ["SELFIE", "ACTION", "PORTRAIT"] })
    category: GQL.PhotoCategory;

    @Column({ type: "text", nullable: true })
    description: string | null | undefined;

    @BeforeInsert()
    addCreateAt() {
        const id = v4();
        this.id = id;
        this.createdAt = new Date();
        this.url = `http://localhost:5000/photos/${this.category}/${id}.${this.extname}`;
    } 
}