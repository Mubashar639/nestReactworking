import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot(config.DB_URL), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
