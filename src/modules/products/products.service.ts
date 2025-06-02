import { Injectable, NotFoundException, ConflictException, Logger } from "@nestjs/common";
import { IProductsRepository } from "./repositories/products.repository";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ProductResponseDto } from "./dtos/product-response.dto";

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);
    constructor(private readonly productsRepository: IProductsRepository) {}

    async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        this.logger.log(`creating product with name: ${(createProductDto.name)}`);

        try {
            const existingProduct = await this.productsRepository.findByName(createProductDto.name);
            if (existingProduct) {
                this.logger.warn(`product creation failed, product with name: ${(createProductDto.name)} already exists`);
                throw new ConflictException(`Product with name: ${(createProductDto.name)} already exists`);
            }

            const product = await this.productsRepository.create(createProductDto);
            this.logger.log(`product created successfully with id: ${(product.id)}`);
            return ProductResponseDto.fromEntity(product);
        } catch (error) {
            if (error instanceof ConflictException) {
            throw error;
            }
            this.logger.error('Failed to create product');
            throw error;
        }
    }

    async findAll(): Promise<ProductResponseDto[]> {
        this.logger.log('finding all products');

        try {
            const products = await this.productsRepository.findAll();
            this.logger.log(`found ${products.length} products`);
            return ProductResponseDto.fromEntities(products);
        } catch (error) {
            this.logger.error(`Failed to find products: ${error.message}, error: ${error.stack}`);
            throw error;
        }
    }
        async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
        this.logger.log(`updating product with id: ${(id)}`);

    try {
        if (UpdateProductDto.name) {
            const existingProduct = await this.productsRepository.findByName(UpdateProductDto.name);
            if (existingProduct && existingProduct.id !== id) {
                this.logger.warn(`product update failed, product with name: ${(UpdateProductDto.name)} already exists`);
                throw new ConflictException(`Product with name: ${(UpdateProductDto.name)} already exists`);
            }
        }

        const updateProduct = await this.productsRepository.update(id, updateProductDto);
        if (!updateProduct) {
            this.logger.warn(`product update failed, product with id: ${(id)} not found`);
            throw new NotFoundException(`Product with id: ${(id)} not found`);
        }

        this.logger.log(`product updated successfully with id: ${(id)}`);
        return ProductResponseDto.fromEntity(updateProduct);
    }
    catch (error) {
        if (error instanceof ConflictException || error instanceof NotFoundException) {
            throw error;
        }
        this.logger.error(`Failed to update product with id ${(id)}: ${error.message}, error: ${error.stack}`);
        throw error;
    }
}
}