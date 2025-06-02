import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

export abstract class IProductsRepository {
    abstract create(data: CreateProductDto): Promise<Product>;
    abstract findAll(): Promise<Product[]>;
    abstract findByName(name: string): Promise<Product | undefined>;
    abstract update(id: string, data: Partial<UpdateProductDto>): Promise<Product | undefined>;
}