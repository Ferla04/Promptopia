import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required!']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required!']
  }
})

export const PromptModel = models.Prompt || model('Prompt', PromptSchema)
