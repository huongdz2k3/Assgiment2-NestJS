import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BuyPetInput {
    @Field()
    petId: string
    @Field({ nullable: true })
    shipDate?: string
}