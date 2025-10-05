
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { prop, modelOptions } from '@typegoose/typegoose';

@ObjectType()
@modelOptions({
    schemaOptions: {
        collection: 'users',
        timestamps: true,
    },
})
export class User {
    @Field(() => ID)
    _id: string;

    @Field()
    @prop({ required: true, unique: true, index: true })
    email: string;

    @Field()
    @prop({ nullable: true })
    name?: string;

    @prop({ required: true })
    password: string;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}
