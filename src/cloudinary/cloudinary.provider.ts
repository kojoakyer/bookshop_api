import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    console.log(configService.get<string>('CLD_CLOUD_NAME'));
    
    return v2.config({
      cloud_name:'kpilens',
      api_key: '312486691567678',
      api_secret: 'RKZ2VgbjlEFDlzWBiPe2sBBtuNA'
    });
  },
};
