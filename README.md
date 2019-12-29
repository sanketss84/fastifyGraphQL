Article Refered [Link](https://www.freecodecamp.org/news/how-to-build-a-blazing-fast-graphql-api-with-node-js-mongodb-and-fastify-77fd5acd2998/)

So now that we have a copy of the codebase we will update our packages and package.json file by running the following code

```

sudo npm i -g npm-check-updates
ncu -u
npm install

```

**GraphQL**
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

Every GraphQL query goes through three phases: the queries are parsed, validated and executed.

GraphQL provides a complete and understandable description of the data in your API, 
gives clients the power to ask for exactly what they need, makes it easier to evolve APIs over time, 
and enables powerful developer tools. 

**GraphQL Fundamentals Playlist**
- [HowToGraphQL (Fundamentals) - Introduction (1/4) - YouTube](https://www.youtube.com/watch?v=oCT4HOJsUZQ)
- [HowToGraphQL (Fundamentals) - GraphQL is the better REST (2/4) - YouTube](https://www.youtube.com/watch?v=T571423fC68)
- [HowToGraphQL (Fundamentals) - Core Concepts (3/4) - YouTube](https://www.youtube.com/watch?v=NeQfq0U5LnI)
- [HowToGraphQL (Fundamentals) - Big Picture (Architecture) (4/4) - YouTube](https://www.youtube.com/watch?v=b7tMHnxzK34&)

**Mongoose** 
- [Schemas Read More](https://mongoosejs.com/docs/guide.html) 

**Env File**
- https://www.npmjs.com/package/dotenv
- https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
- https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
- https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/

**Explicitly loading variables from .env files**
If you develop on multiple different Node.js projects on one computer, you might find you have overlapping environment variable names. For example, different messaging apps might need different Twilio Messaging Service SIDs, but both would be called TWILIO_MESSAGE_SERVICE_SID. A great way to achieve project specific configuration is by using .env files. These files allow you to specify a variety of different environment variables and their values.

Typically you don’t want to check these files into source control so when you create one you should add .env to your your .gitignore. You will see in a lot of demo applications .env.example files that you can then copy to .env and set the values yourself. Having an .env.example or similar file is a common practice if you want to share a template file with other people in the project.


**GraphQL**
- [Building a GraphQL Server with Node.js & Prisma Tutorial](https://www.howtographql.com/graphql-js/0-introduction/)

**GraphQL Cheat Sheet**
- [DevHints GraphQL cheatsheet](https://devhints.io/graphql) 
- [Pagination | GraphQL](https://graphql.org/learn/pagination/)
- [GraphQL Filtering, Pagination & Sorting Tutorial with JavaScript](https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/)

Go To http://localhost:3000/graphiql.html

We now have a fully functional REST API and a fully functional GraphQL API.

There are no rules stating that one should use exclusively REST or exclusively GraphQL. In some projects, the best solution may be a mix of both. This is really determined on a project-to-project basis.