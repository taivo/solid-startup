// async function seedData(db: Database) {
// 	const schema = { exampleTable }

// 	// the d1 driver doesn't like too many statements all at once, so we seed
// 	// in smaller batches. Use a controlled randSeeds array for determinism
// 	//
// 	await Promise.all(
// 		[1, 2].map(
// 			async (randSeed) => seed(db, schema, { count: 10, seed: randSeed })
// 			// .refine((f) => ({
// 			// 		exampleTable: {
// 			// 			columns: { content: f.default({ defaultValue: "blah blah" }) },
// 			// 		},
// 			// 	}))
// 		)
// 	)
// }