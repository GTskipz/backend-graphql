import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) { }

  // LISTAR
  @Query(() => [Comment])
  comments() {
    return this.commentsService.findAll();
  }

  // BUSCAR 1
  @Query(() => Comment, { nullable: true })
  comment(@Args('id', { type: () => ID }) id: number) {
    return this.commentsService.findOne(id);
  }

  @Query(() => [Comment])
  commentsByUser(
    @Args('userId', { type: () => ID }) userId: number,
  ) {
    return this.commentsService.findByUser(userId);
  }


  // CREAR
  @Mutation(() => Comment)
  createComment(@Args('input') input: CreateCommentInput) {
    return this.commentsService.create(input);
  }

  // ACTUALIZAR
  @Mutation(() => Comment)
  updateComment(@Args('input') input: UpdateCommentInput) {
    return this.commentsService.update(input);
  }

  // ELIMINAR
  @Mutation(() => Boolean)
  removeComment(@Args('id', { type: () => ID }) id: number) {
    return this.commentsService.remove(id);
  }
}
