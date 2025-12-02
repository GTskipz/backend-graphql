import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  username: string;

  @Field()
  email: string;
}