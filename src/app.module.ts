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

const providers = [
  AppService,
]

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://inventorybackend:oTy7FGJgr38fLQJJ@cluster0.i504v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0Finances'),
    
    FileSystemModule,
    UserModule,
    LoginModule,
    ProductsModule,
    SalesModule,
    FinancialRegisterModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
