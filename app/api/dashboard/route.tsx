import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-US,en;q=0.9",
};
export async function POST(req: NextRequest) {
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
    const pics = /<source type="image\/webp" srcSet="(https:\/\/photos.zillowstatic.com\/fp\/\S+.webp)/.exec(resp.data)?.[1];
    console.log("pic:", pics);
    const region = /\\"streetAddress\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];
    const price = /\\"price\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];
    const yearBuilt = /\\"yearBuilt\\":(\d+),\\/.exec(resp.data)?.[1];
    const bathrooms = /\\"bathrooms\\":(\d+),\\/.exec(resp.data)?.[1];
    const bedrooms = /\\"bedrooms\\":(\d+),\\/.exec(resp.data)?.[1];
    const sqft = /\\"sqft\\":\\"([^\\]+)\\"/.exec(resp.data)?.[1];

    // console.log(yearBuilt);
    const parsed = { region, price, yearBuilt, bathrooms, bedrooms, sqft };
    writeFileSync("input.json", JSON.stringify(parsed));
    const pyth = await axios.get("http://127.0.0.1:8000/similarity");
    console.log(pyth.data);
    const parsedjson = JSON.parse(pyth.data);
    parsedjson.pic = pics;
    // const zillowfind = await axios.get("https://www.zillow.com/homedetails/" + parsedjson.output.address.replace(" ", "-"), {
    //   headers: {
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    //     accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    //     "accept-encoding": "gzip, deflate, br",
    //     "accept-language": "en-US,en;q=0.9",
    //   },
    // });
    // console.log(zillowfind.data);
    return NextResponse.json(parsedjson);
  } else {
    console.log(resp.data);
  }
  return NextResponse.json("yay");
}

export async function PUT(req: NextRequest) {
  const parsed = await req.json();
  console.log("req", parsed);

  writeFileSync("input.json", JSON.stringify(parsed));
  const pyth = await axios.get("http://127.0.0.1:8000/similarity");
  console.log(pyth.data);
  const parsedjson = JSON.parse(pyth.data);
  // parsedjson.pic = pics;
  return NextResponse.json(parsedjson);
  const zillowfind = await axios.get("https://www.zillow.com/homes/" + parsedjson.output.address.replaceAll(" ", "-"), {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
    },
  });
  console.log(zillowfind.data);
}
