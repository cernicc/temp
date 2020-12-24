import { Resolver, Query } from "type-graphql";

@Resolver()
class SomeResolver {
    @Query((_returns) => String)
    async something(): Promise<String> {
        return "something";
    }
}

export { SomeResolver };
