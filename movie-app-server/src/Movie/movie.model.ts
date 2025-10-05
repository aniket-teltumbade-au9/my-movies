
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { prop, modelOptions } from '@typegoose/typegoose';

@ObjectType()
@modelOptions({
    schemaOptions: {
        collection: 'movies',
        timestamps: true,
    },
})
export class Movie {
    @Field(() => ID)
    _id: string;

    @Field()
    @prop({ required: true, index: true })
    title: string;

    @Field(() => Number)
    @prop({
        get: (date: Date) => date.getFullYear(),
        set: (year: number) => new Date(year, 0, 1),
        type: () => Date
    })
    releaseYear: number

    @Field()
    @prop({ required: true })
    poster: string;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;

    @Field({ nullable: true })
    @prop({ index: true })
    createdBy?: string;
}
