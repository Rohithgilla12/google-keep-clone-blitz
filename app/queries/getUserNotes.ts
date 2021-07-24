import { Ctx } from "blitz"
import db from "db"

export default async function getUserNotes(_ = null, ctx: Ctx) {
  ctx.session.$authorize()
  return await db.note.findMany({ where: { userId: ctx.session.userId } })
}
