import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

import { User } from './users/user.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    // GRAPHQL CONFIG
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,        // Habilita http://localhost:3000/graphql
      sortSchema: true,
    }),

    // DATABASE CONFIG (POSTGRES)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     // <-- CAMBIA ESTO
      password: 'admin123',  // <-- CAMBIA ESTO
      database: 'graphql_test',
      synchronize: true,
      entities: [User, Comment],
    }),

    // LOAD MODULES
    UsersModule,
    CommentsModule,
  ],
})
export class AppModule {}
