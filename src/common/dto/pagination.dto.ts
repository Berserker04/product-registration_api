import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @Min(1)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number;

    @IsOptional()
    @IsString()
    filter?: string;

}