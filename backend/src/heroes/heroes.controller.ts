import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { HeroesService } from './heroes.service';
import { Heroes } from './schemas/heroes.schema';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Heroes[]> {
    return this.heroesService.getAll();
  }

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  getByName(@Param('name') name) {
    return this.heroesService.getByName(name);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id): Promise<Heroes[]> {
    return this.heroesService.getById(id);
  }
}
