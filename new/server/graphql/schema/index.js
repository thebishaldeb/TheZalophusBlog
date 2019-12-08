const { buildSchema }=require('graphql');

module.exports=buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    input UserInput {
        email:String!
        password:String!
    }

    type RootQuery {
        user:[User!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);