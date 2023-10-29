import fs from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
// const Pinecone = require("@pinecone-database/pinecone").Pinecone;
// const dataset = require("../dataset/total.json");
import dataset from "../dataset/total.json";
import { v4 } from "uuid";
import dotenv from "dotenv";
// const v4 = require("uuid").v4;
// const fs = require("fs");
// require("dotenv").config();
// require("@tensorflow/tfjs");
dotenv.config();
// import "@tensorflow/tfjs";

// const model = require("@tensorflow-models/universal-sentence-encoder").model;
console.log(process.env.PINECONE_API_KEY);
const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey: process.env.PINECONE_API_KEY!,
});

const upsert = async (data: any) => {
  const index = pinecone.Index("pcparts");
  const { price, name, embedding, ...extra } = data;

  const upsertRequest = {
    vectors: [
      {
        id: v4(),
        values: embedding,
        metadata: {
          extra,
          price,
          name,
        },
      },
    ],
  };
  try {
    const upsertResponse = await index.upsert([...upsertRequest.vectors]);
    return upsertResponse;
  } catch (err) {
    return err;
  }
};

// (async () => {
//   const parts = dataset.parts!;
//   for (let i = 0; i < parts.length; i++) {
//     model.load().then(async (loaded) => {
//       const embedding = await loaded.embed(JSON.stringify(parts[i]));
//       await upsert({
//         ...parts[i],
//         embedding,
//       });
//     });

//     // const embedding = await openAiHelper.createEmbedding(chunkedArticles[i].content);
//     // await upsert({
//     //   content: chunkedArticles[i].content,
//     //   content_tokens: chunkedArticles[i].content_tokens,
//     //   embedding,
//     // });

//     //temporary disabling supabase from prev trial

//     // const { data,error } = await supabaseHelper
//     //     .from('semantic_search_poc')
//     //     .insert({
//     //         content: chunkedArticles[i].content,
//     //         content_tokens: chunkedArticles[i].content_tokens,
//     //         embedding
//     // })

//     setTimeout(() => {}, 500);
//   }
// })();
