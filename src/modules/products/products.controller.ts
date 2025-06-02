import { Controller, Get, Post, Put, Body, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ProductResponseDto } from "./dtos/product-response.dto";
import { ParseUUIDValidationPipe } from "src/shared/pipes/parse-uuid-validation.pipe";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post ()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<ProductResponseDto[]> {
        return this.productsService.findAll();
    }
    

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id', ParseUUIDValidationPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
        return this.productsService.update(id, updateProductDto);
    }
}