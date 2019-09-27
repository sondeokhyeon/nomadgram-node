import ApploClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState"

export default new ApploClient({
    uri:"http://localhost:4000",
    clientState: {
        defaults,
        resolvers
      }
});

