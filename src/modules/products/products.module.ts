import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { IProductsRepository } from "./repositories/products.repository";
import { PostgresProductsRepository } from "./repositories/postgres-products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService, { provide: IProductsRepository, useClass: PostgresProductsRepository }],
    exports: [ProductsService]
})
export class ProductsModule {}