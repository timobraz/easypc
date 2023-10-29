import postgres from 'postgres'
import crypto from 'crypto'

const sql = postgres(process.env.DATABASE_URL!)

async function insert_build(build: Build, use_case: string) {
  const uuid = crypto.randomUUID();

  const xs = await sql`
    INSERT INTO public.parts (build_id, type, part, use_case)
    VALUES
        (${uuid}, "cpu", ${build.cpu}, ${use_case}),
        (${uuid}, "gpu", ${build.gpu}, ${use_case}),
        (${uuid}, "ram", ${build.ram}, ${use_case}),
        (${uuid}, "storage", ${build.storage}, ${use_case}),
        (${uuid}, "motherboard", ${build.motherboard}, ${use_case}),
        (${uuid}, "psu", ${build.psu}, ${use_case}),
    RETURNING *;
  `
}


export default sql