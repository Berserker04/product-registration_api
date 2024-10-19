import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './DTO/create-product.dto';
import { v4 as uuid } from 'uuid';
import slug from 'slugify';
import { UpdateProductDto } from './DTO/update-product.dto';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [
    {
      id: uuid(),
      name: 'IPhone 16 pro max',
      slug: 'iphone-16-pro-max',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      name: 'IPhone 15 pro max',
      slug: 'iphone-15-pro-max',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      name: 'IPhone 14 pro max',
      slug: 'iphone-14-pro-max',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.products;
  }

  findOneById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`);

    return product;
  }

  create(createProductDto: CreateProductDto) {
    const product: IProduct = {
      id: uuid(),
      ...createProductDto,
      slug: slug(createProductDto.name),
      createdAt: new Date(),
    };

    this.products.push(product);

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productDB = this.findOneById(id);

    if (updateProductDto.id && updateProductDto.id !== id)
      throw new BadRequestException(`Product id is not valid inside body`);

    this.products = this.products.map((product) => {
      if (product.id === id) {
        productDB = {
          ...productDB,
          ...updateProductDto,
          id,
          updatedAt: new Date(),
        };
        if (updateProductDto.name) {
          productDB.slug = slug(updateProductDto.name);
        }
        return productDB;
      }

      return product;
    });

    return productDB;
  }

  delete(id: string) {
    const product = this.findOneById(id);
    this.products = this.products.filter((product) => product.id !== id);
  }
}
