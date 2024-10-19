import { IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    readonly name: string;
}