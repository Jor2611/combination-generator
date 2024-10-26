import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { DatabaseInitService } from './database-init.service';
import { DatabaseSeedService } from './database-seed.servcie';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ whitelist: true })
    },
    DatabaseInitService,
    DatabaseSeedService,
    {
      provide: 'MYSQL_CONNECTION',
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => {
        const connection = await mysql.createConnection({
          host: config.getOrThrow<string>('MYSQL_HOST'),
          user: config.getOrThrow<string>('MYSQL_USER'),
          password: config.getOrThrow<string>('MYSQL_PASSWORD'),
          database: config.getOrThrow<string>('MYSQL_DATABASE'),
          port: config.getOrThrow<number>('MYSQL_PORT'),
        });
        return connection;
      },
    },
  ],
})
export class AppModule {}
