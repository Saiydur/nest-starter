import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { getMulterConfig } from 'src/configs/multer/multer.config';
import { Constants } from 'src/utils/constant.utils';
import { FileUploadsService } from './file-uploads.service';

@Controller({
  path: 'file-uploads',
  version: Constants.API_VERSION_1,
})
@UseGuards(AuthGuard)
export class FileUploadsController {
  constructor(private readonly fileUploadsService: FileUploadsService) {}

  @Post('media-images')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumb', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ],
      getMulterConfig('./uploads'),
    ),
  )
  async uploadMediaImages(
    @UploadedFiles()
    files: {
      thumb?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    },
  ) {
    const imageObjects = JSON.parse(JSON.stringify(files));
    return this.fileUploadsService.uploadMediaImages(files, imageObjects);
  }

  @Post('image')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      getMulterConfig('./uploads'),
    ),
  )
  async uploadFiles(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const imageObject = JSON.parse(JSON.stringify(files)).image[0];

    return this.fileUploadsService.upload(files, imageObject);
  }
}
