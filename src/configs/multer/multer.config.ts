import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function getMulterConfig(filePath: string) {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, filePath);
      },
      filename: (req, file, cb) => {
        const name = uuidv4() + path.extname(file.originalname);
        cb(null, name);
      },
    }),
    /* fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            // if (ext !=== '.png' && ext !=== '.jpg' && ext !=== '.gif' && ext !=== '.jpeg') {
            //     return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
            // }
            cb(null, true);
        }, */
    limits: { fileSize: 1024 * 1024 * 50 },
  };
}
