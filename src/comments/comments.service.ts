import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  // LISTAR TODOS
  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['user'] });
  }

  // BUSCAR POR ID
  findOne(id: number): Promise<Comment> {
    return this.commentRepo.findOne({ where: { id }, relations: ['user'] });
  }

  // CREAR
  async create(input: CreateCommentInput): Promise<Comment> {
    const user = await this.userRepo.findOne({ where: { id: input.userId } });

    const comment = this.commentRepo.create({
      content: input.content,
      user,
    });

    return this.commentRepo.save(comment);
  }
 
  //Buscar comentarios por ID usuario
  findByUser(userId: number): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { fechaCreacion: 'DESC' }
    });
  }

  // ACTUALIZAR
  async update(input: UpdateCommentInput): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id: input.id } });

    if (input.content) comment.content = input.content;

    if (input.userId) {
      const user = await this.userRepo.findOne({ where: { id: input.userId } });
      comment.user = user;
    }

    return this.commentRepo.save(comment);
  }

  // ELIMINAR
  async remove(id: number): Promise<boolean> {
    await this.commentRepo.delete(id);
    return true;
  }
}
