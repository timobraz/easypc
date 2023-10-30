import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import parser from "@/../parser";
import insert_build from "@/../lib/db";
import get_part_descriptions from "../../../lib/mindsdb";

export async function POST(req: NextRequest) {
  const data: any = await req.json();
  const resp = await axios.post(
    "https://api.together.xyz/inference",
    {
      model: "thorchri@usc.edu/Llama-2-7B-32K-Instruct-2023-10-29-09-45-46",
      max_tokens: 1400,
      prompt:
        "You are an AI focused on generating lists of PC components based on given user requirements. Your task is to provide a list of recommended parts in a specific order. Your responses should be clear, concise, and informative with the full model name. Do not engage in regular conversation with the user. Always ensure that your recommendations are based on the information provided and are well-reasoned and with enough information. In general, try not to recommend the 3090 or 4090 unless the build budget is over $3000. Make sure the CPU includes the model e.g. Ryzen 5 or Intel i5. The format should be first the prompt, then cpu, gpu, ram, motherboard, powersupply, storage, and case, all separated by semicolon ; Like this: \nPrompt: Prompt ;<CPU> CPU; <GPU> GPU; <RAM> RAM; <MOBO> MOBO; <PSU> PSU; <STORAGE> STORAGE; <CASE> CASE \nUser Prompt: " +
        data.prompt +
        ": \n<CPU> ",
      request_type: "language-model-inference",
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["[INST]", "\n\n"],
      negative_prompt: "",
      sessionKey: "8819e382626ead35e0bde588f78a5fb8176952ec",
      update_at: "2023-10-29T12:42:47.612Z",
    },
    {
      headers: {
        Authorization: "Bearer 2d03281983b9a1e6704e17dd97fb77420fa3ce56bce2de2f089845639e27c96f",
      },
    }
  );
  if (resp.data) {
    console.log(resp.data);
    console.log(resp.data.output.choices[0].text);
    const option = resp.data.output.choices[0].text.trim();
    const out2 =
      "12900KF; <GPU> 4090; <RAM> 32GB; <MOBO> Z690 GAMING MAG; <PSU> Corsair RM850x (2020); <STORAGE> 2x 1TB M.2-2280 PCIE 4.0 X4 NVME SSD; <CASE> Corsair 4000D Airflow";
    const parsed = parser("<CPU> " + option);
    return NextResponse.json(parsed);
  }
}
