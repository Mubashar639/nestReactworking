import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDTO {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly imageUrl: string;
  @ApiProperty()
  readonly description: string;
}
