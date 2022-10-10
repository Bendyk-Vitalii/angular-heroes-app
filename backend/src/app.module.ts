import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule } from './api/user/auth/auth.module';
import { ApiModule } from './api/api.module';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UserModule } from './api/user/user.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MongooseModule.forRoot(
      'mongodb+srv://Vitalii:admin@cluster0.cy4gjd3.mongodb.net/all-heroes?retryWrites=true&w=majority',
    ),
    HeroesModule,
    AuthModule,
    UserModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
