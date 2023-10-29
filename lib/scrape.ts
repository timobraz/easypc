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
      cookie:
        "xcsrftoken=EpkWpySGJrlLBoOGT5Hvmcm1Qnh2aEg2aoICy6J0iAYIMbaCRT9TP1YoTLUerXZW; cf_clearance=10G6N26uYBr._B5c5MwjYhHJhEqr5nnoZPR2unGd9AA-1698500596-0-1-217ba70.4b09a98d.912d3306-0.2.1698500596; xsessionid=c4em5dll0momm3rgb52hcqjzftmu7rhq; xgdpr-consent=allow; __cf_bm=t4Lj0WygM7tjOB.QhjSWcZIom8bxFraGY7A22iTpUHk-1698560166-0-AUkIR7CpR3qYn4Qlqdk3dyfJ9b1zPrI6f5sqsoHgHepLgsNoDcP40HL/D+Rc/zj8EXElYxKuOIdFzCrcOAGsmC8=",
      Referer: "https://pcpartpicker.com/builds/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
  const $ = cheerio.load(res.data);
  console.log($.html());
})();

// const $ = cheerio.load(res);
// console.log(pretty($.html()));
