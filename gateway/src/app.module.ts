import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './users/user.module';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // <--- esto es lo que lo hace accesible en toda la app
    }),
    HttpModule,
    AuthModule,
    UserModule,
    DataModule,
    EmailModule,
    
  ],
})
export class AppModule {}
