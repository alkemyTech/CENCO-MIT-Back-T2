import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerOptions, throttlerProvider } from './config';
import { IsUnique } from './auth/decorators/is-unique';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ThrottlerModule.forRoot(throttlerOptions),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, throttlerProvider],
})
export class AppModule {}
