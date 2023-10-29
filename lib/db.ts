import dotenv from "dotenv";
import postgres from "postgres";
import { v4 } from "uuid";
dotenv.config();
const sql = postgres(process.env.DATABASE_URL!);
console.log(process.env.DATABASE_URL);
export default async function insert_build(build: any, use_case: string) {
  const uuid = v4();

  const xs = await sql`
    INSERT INTO public.parts (build_id, type, part, use_case)
    VALUES
        (${uuid}, 'cpu', ${build.CPU}, ${use_case}),
        (${uuid}, 'gpu', ${build.GPU}, ${use_case}),
        (${uuid}, 'ram', ${build.RAM}, ${use_case}),
        (${uuid}, 'storage', ${build.STORAGE}, ${use_case}),
        (${uuid}, 'motherboard', ${build.MOBO}, ${use_case}),
        (${uuid}, 'psu', ${build.PSU}, ${use_case}),
        (${uuid}, 'case', ${build.CASE}, ${use_case});
  `;

  return uuid;
}
