'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form } from '@components'

export default function UpdatePropmtPage ({ searchParams }) {
  const router = useRouter()
  const promptId = searchParams.id

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptsDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const { prompt = '', tag = '' } = await response.json()
      setPost({ prompt, tag })
    }

    if (promptId) getPromptsDetails()
  }, [])

  const updatePrompt = async event => {
    event.preventDefault()
    setSubmitting(true)

    // eslint-disable-next-line no-undef
    if (!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
