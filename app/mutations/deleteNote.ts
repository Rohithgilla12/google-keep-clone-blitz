import { Ctx } from "blitz"
import db from "db"

export default async function deleteNote(id: number, ctx: Ctx) {
  ctx.session.$authorize()

  await db.note.delete({
    where: {
      id,
    },
  })
}
