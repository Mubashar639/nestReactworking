import {
  Controller,
  Res,
  Query,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { UsersEmails } from '../config';
import { ApiQuery } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}
  @Post('/create')
  async addCustomer(@Res() res, @Body() CreateProductDTO: CreateProductDTO) {
    const list = await this.ProductService.create(CreateProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      list,
    });
  }
  @Get('all')
  async findAll(@Res() res) {
    const lists = await this.ProductService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }
  @Get('id')
  async findById(@Res() res, @Query('id') id: string) {
    const lists = await this.ProductService.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }
  @Put('/update')
  async update(
    @Res() res,
    @Query('id') id: string,
    @Body() CreateProductDTO: CreateProductDTO,
  ) {
    const lists = await this.ProductService.update(id, CreateProductDTO);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists,
    });
  }
  @Delete('/delete')
  async delete(@Res() res, @Query('id') id: string) {
    const lists = await this.ProductService.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists,
    });
  }
}
