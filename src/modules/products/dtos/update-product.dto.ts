import { IsNumber, IsOptional, IsString, MaxLength, Min} from "class-validator";
export class UpdateProductDto {

    @IsOptional()
    @IsString({message: 'Product name must be a string'})
    @MaxLength(100, {message: 'Product name cannnot exceed 100 characters'})
    name?: string

    @IsOptional()
    @IsNumber({},{message: 'Product price must be a number'})
    @Min(0,{message: 'Product price cannot be negative'})
    price?: number
}