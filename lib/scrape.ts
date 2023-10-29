import * as cheerio from "cheerio";
import axios from "axios";
(async () => {
  const res = await axios.get("https://pcpartpicker.com/b/X6j2FT", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9,es;q=0.8",
      "cache-control": "max-age=0",
      "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko",
      Referer: "https://pcpartpicker.com/builds/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
  const $ = cheerio.load(res.data);
  console.log($.html());
})();

// const $ = cheerio.load(res);
// console.log(pretty($.html()));
