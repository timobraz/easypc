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
  handler: async (ctx, _) => {
    const query = await ctx.db.query("builds");
    return query.collect();
  },
});

// export const getSingle = query({
//   // Validators for arguments.
//   args: { _id: v.id("builds") },

//   // Query function implementation.
//   handler: async (ctx, arg) => {
//     return await ctx.db.get(arg._id);
//   },
// });
// You can write data to the database via a mutation function:
export const saveBuild = mutation({
  // Validators for arguments.
  args: {
    description: v.string(),
    parts: v.array(
      v.object({
        title: v.string(),
        price: v.optional(v.number()),
        type: v.string(),
        preview: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
    totalPrice: v.optional(v.number()),
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
export const getSingle = query({
  // Validators for arguments.
  args: { _id: v.id("builds") },

  // Action implementation.
  handler: async (ctx, args) => {
    // Use the browser-like `fetch` API to send HTTP requests.
    // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.

    return await ctx.db.get(args._id);
  },
});
