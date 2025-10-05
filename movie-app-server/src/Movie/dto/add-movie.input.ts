import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddMovieInput {
    @Field()
    title: string;

    @Field()
    releaseYear: number

    @Field()
    poster: string
}