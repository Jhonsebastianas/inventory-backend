import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './plugins/user/user.module';
import { LoginModule } from '@login/login.module';
import { FinancialModule } from '@financial-register/financial-register.module';
import { ProductsModule } from './plugins/products/products.module';
import { SalesModule } from './plugins/sales/sales.module';
import { FileSystemModule } from './plugins/file-system/file-system.module';
import { BusinessModule } from './plugins/business/business.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './plugins/notification/notification.module';
import { ClientsModule } from './plugins/clients/clients.module';
import { CoreModule } from '@core/core.module';

const providers = [
  AppService,
]

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URL_CONNECTION),
    CoreModule,
    FileSystemModule,
    NotificationModule,
    UserModule,
    BusinessModule,
    LoginModule,
    ProductsModule,
    ClientsModule,
    SalesModule,
    FinancialModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
