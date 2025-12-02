import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // LISTAR
  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  // BUSCAR POR ID
  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.findOne(id);
  }

  // CREAR
  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  // ACTUALIZAR
  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.update(input);
  }

  // ELIMINAR
  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.remove(id);
  }
}
