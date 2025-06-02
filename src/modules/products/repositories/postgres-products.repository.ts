import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { IProductsRepository } from "./products.repository";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

@Injectable()
export class PostgresProductsRepository implements IProductsRepository {
    private readonly logger = new Logger(PostgresProductsRepository.name);

    constructor(
        @InjectRepository(Product)
        private readonly typeormProductRepository: Repository<Product>
    ) {}

    async create(data: CreateProductDto): Promise<Product> {
        this.logger.debug(`Creating product in database: ${JSON.stringify(data)}`);
        const newProduct = this.typeormProductRepository.create(data); 
        const savedProduct = await this.typeormProductRepository.save(newProduct);
        this.logger.debug(`Product saved to database with ID: ${savedProduct.id}`);
        return savedProduct;
    }

    async findAll(): Promise<Product[]> {
        this.logger.debug('Fetching all products from database');
        const products = await this.typeormProductRepository.find();
        this.logger.debug(`Retrieved ${products.length} products from database`);
        return products;
    }

    async findByName(name: string): Promise<Product | undefined> {
        this.logger.debug(`Fetching product from database with name: ${name}`);
        const product = await this.typeormProductRepository.findOneBy({ name });
        if (product) {
            this.logger.debug(`Product found in database with name: ${name}`);
        } else {
            this.logger.debug(`Product not found in database with name: ${name}`);
        }
        return product ?? undefined;
    }

    async update(id: string, data: Partial<UpdateProductDto>): Promise<Product | undefined> {
        this.logger.debug(`Updating product in database with ID: ${id}, data: ${JSON.stringify(data)}`);
        const productToUpdate = await this.typeormProductRepository.preload({
            id:id, 
            ...data
        });
        if (!productToUpdate) {
            this.logger.debug(`Product not found for update with ID: ${id}`);
            return undefined;
        }
        const updatedProduct = await this.typeormProductRepository.save(productToUpdate);
        this.logger.debug(`Product updated in database with ID: ${id}`);
        return updatedProduct;
    }
}