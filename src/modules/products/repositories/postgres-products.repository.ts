import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { IProductsRepository } from "./products.repository";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

@Injectable()
export class PostgresProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly typeormProductRepository: Repository<Product>
    ) {}

    async create(data: CreateProductDto): Promise<Product> {
        const newProduct = this.typeormProductRepository.create(data); 
        return this.typeormProductRepository.save(newProduct);
    }

    async findAll(): Promise<Product[]> {
        return this.typeormProductRepository.find();
    }

    async findById(id: string): Promise<Product | undefined> {
        const product = await this.typeormProductRepository.findOneBy({ id });
        return product ?? undefined;
    }

    async findByName(name: string): Promise<Product | undefined> {
        const product = await this.typeormProductRepository.findOneBy({ name });
        return product ?? undefined;
    }

    async update(id: string, data: Partial<UpdateProductDto>): Promise<Product | undefined> {
        const productToUpdate = await this.typeormProductRepository.preload({
            id:id, 
            ...data
        });
        if (!productToUpdate) {
            return undefined;
        }
        return this.typeormProductRepository.save(productToUpdate);
    }

    async delete(id: string): Promise<boolean> {
        const deleteResult = await this.typeormProductRepository.delete( id );
        return deleteResult.affected !== null && deleteResult.affected !== undefined && deleteResult.affected > 0;
    }
}