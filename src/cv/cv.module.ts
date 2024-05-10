import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { FileUploadService } from 'src/common/file-upload.service';

import { CvControllerV2 } from './cv.v2.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CvHistoryModule } from 'src/cvhistory/cvhistory.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CvHistoryRepository } from 'src/cvhistory/cvhistory.repository';
import CvListener from './cv.listener';
import CvHistoryService from 'src/cvhistory/cvhistory.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MySseController } from './sse.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forFeature([CvRepository]),
    JwtModule,
    CvHistoryModule,
    UserModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
    }),
  ],
  controllers: [CvControllerV1, CvControllerV2, MySseController],
  providers: [
    CvService,
    CvRepository,
    FileUploadService,
    UserService,
    CvHistoryRepository,
    CvListener,
    CvHistoryService,
  ],
})
export class CvModule {}
