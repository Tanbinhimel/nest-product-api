import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  addProduct(
    title: string,
    description: string,
    price: number,
  ): { id: string } {
    const newProductId = this.products.length.toString();
    const newProduct = new Product(newProductId, title, description, price);
    this.products.push(newProduct);
    return { id: newProductId };
  }

  getAllProduct(): { products: Product[] } {
    return { products: [...this.products] };
  }

  getProduct(id: string): { product: Product } {
    const { product } = this.findProduct(id);
    return { product: product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): { product: Product } {
    const { product, index } = this.findProduct(id);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (price >= 0) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
    return { product: updatedProduct };
  }

  private findProduct(id): { product: Product; index: number } {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find the product');
    }
    return { product: product, index: productIndex };
  }
}
