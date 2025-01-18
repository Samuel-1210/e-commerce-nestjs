import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });
    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return categoria;
  }

  //   async findByPreco(preco: number): Promise<Categoria[]> {

  //     return await this.categoriaRepository.find({

  //       where: {
  //         preco: MoreThan(preco), // ILIKE > Não é case sensitive
  //       },
  //       relations: {
  //         tema: true,
  //       },
  //     }); // select * from tb_postagens;
  //   }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}
