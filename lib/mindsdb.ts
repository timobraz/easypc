type PartDescriptions = {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  psu: string;
};

export default async function get_part_descriptions(build_id: string): Promise<PartDescriptions> {
  // const res = await fetch("http://127.0.0.1:47334/api/sql/query", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
        
  //     context: {
  //         db: "mindsdb",
  //     },
  //     query: ` \
  //               SELECT t.*, p.prediction \
  //               FROM cockroachdb.parts AS t \
  //               JOIN together_ai_pred AS p \
  //               WHERE t.build_id = ${build_id} \
  //               LIMIT 5 \
  //               USING \
  //                   model_name = 'togethercomputer/llama-2-70b-chat', \
  //                   prompt_template = 'given my use case is {{use_case}}, I would greatly benefit from a {{part}} because'; `
                    
  //                   ,
  //   }),
  // });

  const res = await fetch("http://127.0.0.1:47334/api/sql/query", {
    "credentials": "omit",
    "method": "POST",
    "mode": "cors",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "http://127.0.0.1:47334/editor",
    "body": JSON.stringify({
      context: {
        db: "mindsdb",
      },
      query: `SELECT t.*, p.prediction FROM cockroachdb.parts AS t JOIN together_ai_pred AS p WHERE t.build_id = "${build_id}" LIMIT 5 USING model_name = 'togethercomputer/llama-2-70b-chat', prompt_template = 'given my use case is {{use_case}}, I would greatly benefit from a {{part}} because';`,
    }),
});

  let body = await res.text();

  console.log(body);

  return await res.json();
}
