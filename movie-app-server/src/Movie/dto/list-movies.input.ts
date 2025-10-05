import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ListFilterInput {
    @Field()
    page?: number;

    @Field()
    size?: number;
}