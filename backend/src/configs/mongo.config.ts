import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  '/' +
  '?' +
  configService.get('MONGO_OPTIONS');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
