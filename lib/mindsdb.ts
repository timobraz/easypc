type PartDescriptions = {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  psu: string;
};

export default async function get_part_descriptions(build_id: string): Promise<PartDescriptions> {
  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` \
                SELECT t.*, p.prediction \
                FROM cockroachdb.parts AS t \
                JOIN together_ai_pred AS p \
                WHERE t.build_id = ${build_id} \
                LIMIT 5 \
                USING \
                    model_name = 'togethercomputer/llama-2-70b-chat', \
                    prompt_template = 'given my use case is {{use_case}}, I would greatly benefit from a {{part}} because'; `,
    }),
  });

  const content = await res.json();
  const descriptions = content.data[0];
  return {
    cpu: descriptions[0],
    gpu: descriptions[1],
    ram: descriptions[2],
    storage: descriptions[3],
    motherboard: descriptions[4],
    psu: descriptions[5],
  };
}
