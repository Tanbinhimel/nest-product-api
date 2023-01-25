import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: string } {
    return this.productService.addProduct(title, description, price);
  }

  @Get()
  getAllProduct(): { products: Product[] } {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): { product: Product } {
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { product: Product } {
    return this.productService.updateProduct(id, title, description, price);
  }
}
