// So apollo server provides you their own interface to test our graphQL quries, so to start that server you need to use this import
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { schema } from "./graphQL/schema.js";
import { connectDB } from "./database/database.js";
import { getAllUsers } from "./controllers/user.js";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;

connectDB(mongoURI);

// So first you need to made a server and configure it with 2 main properties of graphQL which is schemas and resolvers ,so you have to give schema (i.e typeDefs) as first agrument and resolvers as second argument.
// Schema is structure of your data in backend
// Resolvers is actual thing which returns somthing on call of queries from frontend
const server = new ApolloServer({
  // typeDefs: `type Query { hello:String }`,
  typeDefs: schema, //Here we just declare schema in other file for better code management
  resolvers: {
    Query: {
      hello: () => "Hello World",
      wow: () => "Wow1234",
      users: () => getAllUsers(),
    },
  },
});

// So this standaloneserver is use to start apollo provided UI to test GraphQL queries
startStandaloneServer(server, {
  listen: {
    port,
  },
})
  .then(() => {
    console.log("Server running on port:" + port);
  })
  .catch((err) => {
    console.log(err);
  });

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: " * ", credentials: true }));
// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// your routes here

// app.get("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found",
//   });
// });

// app.use(errorMiddleware);

// app.listen(port, () =>
//   console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
// );
