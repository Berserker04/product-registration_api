import { IsOptional, IsString, MinLength, IsUUID } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly name?: string;
}