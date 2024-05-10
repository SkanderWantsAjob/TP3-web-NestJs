import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';
import { multerConfig } from 'src/common/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/file-upload.service';
import { Express } from 'express';
import {
  UseGuards,
  Req,
  Version,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';

@Controller({
  path: 'cv',
  version: '1',
})
export class CvControllerV1 {
  constructor(
    private readonly cvService: CvService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  /*
  @Post()
  async create(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }*/
  
  /*
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadFile(file);
    //return file;
  }*/

  @Get('')
  async findAll(@Query(ValidationPipe) filter: GetCvFilterDto): Promise<Cv[]> {
    return await this.cvService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.findById(+id);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    return await this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.remove(+id);
  }
}
