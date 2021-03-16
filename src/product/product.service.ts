import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.schema';
import { CreateProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private ProductModel: Model<Product>) {}
  async create(CreateProductDTO: CreateProductDTO): Promise<any> {
    const createdCat = new this.ProductModel(CreateProductDTO);
    return createdCat.save();
  }
  async findAll(): Promise<any> {
    return await this.ProductModel.find().exec();
  }
  async findById(id): Promise<Product> {
    const customer = await this.ProductModel.findById(id).exec();
    return customer;
  }
  async find(req): Promise<any> {
    return await this.ProductModel.find(req).exec();
  }
  async update(id, CreateProductDTO: CreateProductDTO): Promise<any> {
    return await this.ProductModel.findByIdAndUpdate(id, CreateProductDTO, {
      new: true,
    });
  }
  async delete(id): Promise<any> {
    return await this.ProductModel.findByIdAndRemove(id);
  }
}
