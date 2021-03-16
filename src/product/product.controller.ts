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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
// import { UsersEmails } from '../config';
import { ApiQuery } from '@nestjs/swagger';
import { CreateProductDTO, pagelimit } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}
  @Post('/uploadImage')
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file, @Res() res) {
    console.log(file);
    return res.status(HttpStatus.OK).json({
      message: 'image upload',
      file,
    });
  }
  @Post('/create')
  // @UseInterceptors(FileInterceptor('file'))
  async addCustomer(@Res() res, @Body() CreateProductDTO: CreateProductDTO) {
    const list = await this.ProductService.create(CreateProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      list,
    });
  }
  @Get('all')
  async findAll(@Res() res, @Query() query: pagelimit) {
    const lists = await this.ProductService.findAll(query);
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
