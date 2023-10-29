import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query function:
export const listBuilds = query({
  // Validators for arguments.
  args: {},

  // Query function implementation.
  handler: async (ctx, args) => {
    const query = await ctx.db.query("builds");
    return query.collect();
  },
});

// You can write data to the database via a mutation function:
export const saveBuild = mutation({
  // Validators for arguments.
  args: {
    parts: v.array(v.object({ title: v.string(), price: v.number(), preview: v.string(), description: v.string() })),
    description: v.string(),
    totalPrice: v.number(),
    title: v.string(),
  },

  // Mutation function implementation.
  handler: async (ctx, args) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.

    // Optionally, capture the ID of the newly created document
    const id = await ctx.db.insert("builds", args);

    // Optionally, return a value from your mutation.
    return id;
  },
});

// // You can fetch data from and send data to third-party APIs via an action:
// export const fetchRandomIdea = action({
//   // Validators for arguments.
//   args: {},

//   // Action implementation.
//   handler: async (ctx) => {
//     // Use the browser-like `fetch` API to send HTTP requests.
//     // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     const response = await fetch("https://appideagenerator.com/call.php");
//     const idea = await response.text();

//     // Write or query data by running Convex mutations/queries from within an action
//     await ctx.runMutation(api.myFunctions.saveIdea, {
//       idea: idea.trim(),
//       random: true,
//     });

//     // Optionally, return a value from your action
//     return idea;
//   },
// });
