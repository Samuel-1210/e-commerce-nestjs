import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Produto } from './produto/entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_ecommerce_games',
      entities: [Produto,Categoria],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
