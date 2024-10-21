import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { validate as isUUID } from 'uuid';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { filter, limit = 10, page = 1 } = paginationDto;
    const skip = (page - 1) * limit;

    const query = this.productRepository.createQueryBuilder('product');
    if (filter) {
      if (isUUID(filter)) {
        query.where('product.id = :filter', { filter });
      } else {
        query.where('product.name LIKE :filter OR product.slug LIKE :filter', {
          filter: `%${filter}%`, // Usamos LIKE para búsquedas parciales
        });
      }
    }
    query.orderBy('product.createdAt', "DESC");
    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      products: data,
      paginate: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`);

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const productDb = await this.productRepository.create(createProductDto);
      await this.productRepository.save(productDb);
      return productDb;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async delete(id: string) {
    const product = await this.findOneById(id);
    return await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
