import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './plugins/user/user.module';
import { LoginModule } from '@login/login.module';
import { FinancialRegisterModule } from '@financial-register/financial-register.module';
import { ProductsModule } from './plugins/products/products.module';
import { SalesModule } from './plugins/sales/sales.module';
import { FileSystemModule } from './plugins/file-system/file-system.module';
import { BusinessModule } from './plugins/business/business.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './plugins/notification/notification.module';
import { ClientsModule } from './plugins/clients/clients.module';

const providers = [
  AppService,
]

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://inventorybackend:oTy7FGJgr38fLQJJ@cluster0.i504v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0Finances'),
    FileSystemModule,
    NotificationModule,
    UserModule,
    BusinessModule,
    LoginModule,
    ProductsModule,
    ClientsModule,
    SalesModule,
    FinancialRegisterModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
