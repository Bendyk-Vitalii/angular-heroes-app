import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Heroes, HeroesSchema } from './schemas/heroes.schema';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Heroes',
        schema: HeroesSchema,
      },
    ]),
  ],
})
export class HeroesModule {}
