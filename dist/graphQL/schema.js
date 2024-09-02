export const schema = `#graphql
    type user {
        _id:ID!
        name:String!
        email:String!
        password:String
        googleId:String
        role:String!
        avatar:String!
        verified:Boolean!
        createdAt:String
        updatedAt:String
    }

    type Query {
        hello:String
        wow:String
        users:[user]
    }
`;
