import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadsService {
  uploadMediaImages(
    files: {
      thumb?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    },
    imageObjects?: any,
  ) {
    let thumbUrl = null;
    let coverUrl = null;

    if (files && files.thumb && files.thumb.length > 0) {
      thumbUrl = files.thumb.map((f) => f['location']);
    }
    if (files && files.thumb && files.thumb.length > 0) {
      coverUrl = files.thumb.map((f) => f['location']);
    }
    return {
      imageObjects,
    };
  }

  upload(
    files: {
      images?: Express.Multer.File[];
    },
    imageObject?: any,
  ) {
    let fileUrls = [];
    if (files && files.images && files.images.length > 0) {
      fileUrls = files.images.map((f) => f['location']);
    }
    return {
      imageObject,
    };
  }
}
