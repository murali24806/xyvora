import { type SchemaTypeDefinition } from 'sanity'

// Define your content schemas here
const heroSchema = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSchema],
}
