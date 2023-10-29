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
        (${uuid}, 'cpu', ${build.CPU ?? 'Ryzen 5 5600X'}, ${use_case}),
        (${uuid}, 'gpu', ${build.GPU ?? 'NVIDIA RTX 2060'}, ${use_case}),
        (${uuid}, 'ram', ${build.RAM ?? '16GB (2 x 8GB) G.Skill Ripjaws S5 6000MHz'}, ${use_case}),
        (${uuid}, 'storage', ${build.STORAGE ?? 'Samsung 990 Pro 2TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive'}, ${use_case}),
        (${uuid}, 'motherboard', ${build.MOBO ?? 'MSI MAG B550 TOMOHAWK MAX WIFI'}, ${use_case}),
        (${uuid}, 'psu', ${build.PSU ?? ' Corsair RM1000x (2021) 600W 80+ Gold Certified Fully Modular ATX; '}, ${use_case}),
        (${uuid}, 'case', ${build.CASE ?? 'NXZT H5'}, ${use_case});
  `;

  return uuid;
}
