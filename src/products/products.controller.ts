import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { UpdateProductDto } from './DTO/update-product.dto';
import { CreateProductDto } from './DTO/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService
      ) {}
    
      @Get()
      getAllProducts() {
        return this.productsService.findAll()
      }
    
      @Get(':id')
      getProductsById( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.productsService.findOneById( id );
      }
    
      @Post()
      createProducts( @Body() createProductDto: CreateProductDto ) {
        return this.productsService.create( createProductDto );
      }
    
      @Patch(':id')
      updateProducts( 
        @Param('id', ParseUUIDPipe ) id: string, 
        @Body() updateProductDto: UpdateProductDto ) 
      {
        return this.productsService.update( id, updateProductDto );
      }
    
      @Delete(':id')
      deleteProducts( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.productsService.delete( id )
      }
    

}
