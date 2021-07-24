import { Ctx } from "blitz"
import db from "db"

export default async function createNote(text: string, ctx: Ctx, title?: string) {
  ctx.session.$authorize()

  await db.note.create({
    data: {
      text,
      title,
      userId: ctx.session.userId,
    },
  })
}
