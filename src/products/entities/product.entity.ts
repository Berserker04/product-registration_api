import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slug from 'slugify';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('timestamptz', {
    default: new Date(),
  })
  createdAt: Date;

  @Column('timestamptz', {
    default: new Date(),
  })
  updatedAt?: Date;

  @BeforeInsert()
  checkSlugInsert() {
    this.slug = slug(this.name);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = slug(this.name);
    this.updatedAt = new Date();
  }
}
