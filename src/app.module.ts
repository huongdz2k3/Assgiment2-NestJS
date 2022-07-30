import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { PetModule } from './pet/pet.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { OrderModule } from './order/order.module';
// import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://huongdz2003:Huongdzcogisai2003@nodeexpressprojects.ybqix.mongodb.net/PetStore'),
    UserModule,
    AuthModule,
    PetModule,
    OrderModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [UserModule, AuthModule, PetModule, OrderModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
