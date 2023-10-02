import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'shareapp',

  projectId: '6a0se3g2',
  dataset: 'shareme',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
