import { Ctx } from "blitz"
import db from "db"

export default async function createNote(text: string, ctx: Ctx) {
  ctx.session.$authorize()

  await db.note.create({
    data: {
      text,
      userId: ctx.session.userId,
    },
  })
}
