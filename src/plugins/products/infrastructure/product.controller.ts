import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductRegisterDTO } from '../domain/model/dto/product-register.dto';
import { ProductDTO } from '../domain/model/dto/product.dto';
import { ResponseDTO } from '@core/domain/response.dto';
import { ProductServiceImpl } from '../application/product-service.impl';

@Controller('products')
@ApiTags('products')
export class ProductController {

    constructor(
        private productServiceImpl: ProductServiceImpl,
    ) { }

    @Post()
    @ApiOperation({ description: 'Registra un nuevo producto.' })
    async registerProduct(@Body() productRegisterDTO: ProductRegisterDTO): Promise<ResponseDTO> {
        return await this.productServiceImpl.registerProduct(productRegisterDTO);
    }

    @Put(':id')
    @ApiOperation({ description: 'Actualiza la información de un producto existente.' })
    async updateProduct(@Param('id') id: string, @Body() productUpdateDTO: ProductDTO): Promise<ResponseDTO> {
        return await this.productServiceImpl.updateProduct(id, productUpdateDTO);
    }

    @Delete(':id')
    @ApiOperation({ description: 'Elimina un producto por su ID.' })
    async deleteProduct(@Param('id') id: string): Promise<ResponseDTO> {
        return await this.productServiceImpl.deleteProduct(id);
    }

    @Get()
    @ApiOperation({ description: 'Obtiene todos los productos.' })
    async findAll(): Promise<ProductDTO[]> {
        return await this.productServiceImpl.findAll();
    }

    @Get(':id')
    @ApiOperation({ description: 'Obtiene un producto por su ID.' })
    async findById(@Param('id') id: string): Promise<ProductDTO> {
        return await this.productServiceImpl.findById(id);
    }

    @Get('name/:name')
    @ApiOperation({ description: 'Busca un producto por su nombre exacto.' })
    async findByName(@Param('name') name: string): Promise<ProductDTO> {
        return await this.productServiceImpl.findByName(name);
    }

    @Get('like/:name')
    @ApiOperation({ description: 'Busca productos que coincidan parcialmente con el nombre.' })
    async findByLikeName(@Param('name') name: string): Promise<ProductDTO[]> {
        return await this.productServiceImpl.findByLikeName(name);
    }
}
