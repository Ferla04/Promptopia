'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Profile } from '@components'

export default function MyProfilePage () {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    fetchPost()
  }, [])

  const handleEdit = (post) => router.push(`/update-prompt?id=${post._id}`)
  const handleDelete = async (postD) => {
    // eslint-disable-next-line no-undef
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    if (!hasConfirmed) return

    try {
      await fetch(`/api/prompt/${postD._id.toString()}`, { method: 'DELETE' })
      const filteredPost = posts.filter(post => post._id !== postD._id)
      setPosts(filteredPost)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Profile
      name='My'
      description='HOlaaaaaaaaaa que mas pues'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
