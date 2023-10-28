import { createUser, UserI } from "@/lib/prisma/user";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import cheerio from "cheerio";
import fs from "fs";
export async function POST(req: NextRequest) {
  const data: UserI = await req.json();
  console.log(data);
  const resp = await createUser(data);
  return NextResponse.json({ resp });
}

export async function PUT(req: NextRequest) {
  const data: any = await req.json();
  console.log(data);

  const resp = await axios.get(data.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
    },
  });

  if (resp.status == 200) {
    fs.writeFileSync("export.html", resp.data);
    const pic = /https:\/\/photos.zillowstatic.com\/fp\/\S+.webp/.exec(resp.data)?.[0];
    console.log("pic:", pic);
    const region = /\\"streetAddress\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];
    const price = /\\"price\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];
    const yearBuilt = /\\"yearBuilt\\":(\d+),\\/.exec(resp.data)?.[1];
    const bathrooms = /\\"bathrooms\\":(\d+),\\/.exec(resp.data)?.[1];
    const bedrooms = /\\"bedrooms\\":(\d+),\\/.exec(resp.data)?.[1];
    const sqft = /\\"sqft\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];

    console.log(yearBuilt);
    const parsed = { pic, region, price, yearBuilt, bathrooms, bedrooms, sqft };
    fs.writeFileSync("parsed.json", JSON.stringify(parsed));
    return NextResponse.json(parsed);
  } else {
    console.log(resp.data);
  }
  return NextResponse.json("yay");
}
