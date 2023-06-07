import { connectToDB } from '@utils/database'
import { PromptModel } from '@models'

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const prompt = await PromptModel.findById(params.id).populate('creator')
    if (!prompt) return new Response('prompt not found', { status: 400 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to fecth prompt', { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json()
    await connectToDB()

    const existingPrompt = await PromptModel.findById(params.id)
    if (!existingPrompt) return new Response('prompt not found', { status: 400 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await PromptModel.findByIdAndRemove(params.id)

    return new Response('Propmt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 })
  }
}
