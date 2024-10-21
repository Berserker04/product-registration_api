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
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @BeforeInsert()
  checkSlugInsert() {
    this.slug = slug(this.name.toLowerCase());
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = slug(this.name.toLowerCase());
    this.updatedAt = new Date();
  }
}
