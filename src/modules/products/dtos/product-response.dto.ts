import { Expose, Type } from 'class-transformer';
import { Product } from '../entities/product.entity';

export class ProductResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    price: number;

    @Expose()
    @Type(() => Date)
    created_at: Date;

    @Expose()
    @Type(() => Date)
    updated_at: Date;

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
        
    }

    static fromEntity(entity: Product): ProductResponseDto {
        return new ProductResponseDto(entity);
    }

    static fromEntities(entities: Product[]): ProductResponseDto[] {
        return entities.map(entity => ProductResponseDto.fromEntity(entity));
    }
}