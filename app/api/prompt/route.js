import { connectToDB } from '@utils/database'
import { PromptModel } from '@models'

export const GET = async (req) => {
  try {
    await connectToDB()

    const prompts = await PromptModel.find({}).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fecth all prompts', { status: 500 })
  }
}
