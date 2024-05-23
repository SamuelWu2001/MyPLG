
import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ModuleRef } from '@nestjs/core';
import { AppService } from './app.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly appService: AppService
    ) {
    }

    @Post('/single')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
      return file;
    }

    // @Post('/multiple')
    // @UseInterceptors(FilesInterceptor('files'))
    // uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    //   return files.map(({ fieldname, originalname }) => { return {fieldname, originalname }; });
    // }

    @Post('/multiple')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'first' },
      { name: 'second' }  
    ]))
    @ApiConsumes('multipart/form-data')
    uploadMultipleFiles(@UploadedFiles() files: { [x: string]: Express.Multer.File[] }) {
      const { first, second } = files;
      const list = [...first, ...second];

      return list.map(({ fieldname, originalname }) => ({ fieldname, originalname }));
    }

    // @Get('/todos')
    // getTodos() {
    //   return this.appService.getTodos();
    // }
}