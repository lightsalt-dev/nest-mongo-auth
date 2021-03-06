import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  /* prettier-ignore */
  imports: [
    AuthModule,
    RouterModule.register([{
      path: 'auth',
      module: AuthModule,
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
