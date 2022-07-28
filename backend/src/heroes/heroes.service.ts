import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { Heroes, HeroesDocument } from './schemas/heroes.schema';

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Heroes.name)
    private readonly heroesModel: Model<HeroesDocument>,
  ) {}

  async getAll() {
    return await this.heroesModel.find().exec();
  }

  async getByName(nameQuery: FilterQuery<Heroes>): Promise<Heroes[]> {
    return await this.heroesModel.find(nameQuery);
  }

  async getById(id: string): Promise<any> {
    return await this.heroesModel.findById(
      { heroId: new Types.ObjectId(id) },
      function (err) {
        if (err) return console.log(err);
      },
    );
  }
}
