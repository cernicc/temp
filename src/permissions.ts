import { rule, shield } from "graphql-shield";

// user is authenticated
const isAuthenticated = rule({ cache: "contextual" })(async (_parent, _args, ctx, _info) => {
    return true;
});

const permissions = shield(
    {
        Query: {
            something: isAuthenticated,
        },
    },
);

export { permissions };
