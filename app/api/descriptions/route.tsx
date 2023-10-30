import { NextRequest, NextResponse } from "next/server";
import insert_build from "../../../lib/db";
import get_part_descriptions from "../../../lib/mindsdb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body)
  const resp2 = await insert_build(body.build, body.prompt.trim());
  console.log(resp2);
  const parts: any = await get_part_descriptions(resp2);
  console.log(parts);

  const cpu_description = parts.data.find((x: any) => x[1] == "cpu")[4];
  const gpu_description = parts.data.find((x: any) => x[1] == "gpu")[4];
  const ram_description = parts.data.find((x: any) => x[1] == "ram")[4];
  const mobo_description = parts.data.find((x: any) => x[1] == "mobo")[4];
  const psu_description = parts.data.find((x: any) => x[1] == "psu")[4];
  const storage_description = parts.data.find((x: any) => x[1] == "storage")[4];
  const case_description = parts.data.find((x: any) => x[1] == "case")[4];

  const part_descriptions = {
    CPU: cpu_description,
    GPU: gpu_description,
    RAM: ram_description,
    MOBO: mobo_description,
    PSU: psu_description,
    STORAGE: storage_description,
    CASE: case_description,
  };

  return NextResponse.json(part_descriptions);
}
