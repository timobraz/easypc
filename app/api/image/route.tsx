import fs from "fs";
import { FromPixels } from "@tensorflow/tfjs-node";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";
import request from "https";

export async function POST(req: NextRequest) {
  const data: any = await req.json();
  let rawData = "";
  request.get(data.url, (res) => {
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    const data = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(rawData).toString("base64");
    console.log(data);
    fs.writeFileSync("image.png", Buffer.from(data));
  });
  const pyth = await axios.get("http://127.0.0.1:7000/image" + data.url);
  console.log(pyth.data);
  const parsedjson = JSON.parse(pyth.data);
  return NextResponse.json("yay");
}
