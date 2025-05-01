import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const exampleTable = sqliteTable("example", {
	id: int().primaryKey({ autoIncrement: true }),
	content: text().notNull()
})