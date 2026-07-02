import { useParams } from "react-router-dom"
import usePostStore from "../../app/createPost";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";


const PostsDetails = () => {
  const { id } = useParams();
  const post = usePostStore((state) => state.post);
  const getPost = usePostStore((state) => state.getPost);
  const updatePost = usePostStore((state) => state.updatePost);
  const deletePost = usePostStore((state) => state.deletePost);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    description: post?.desc || ""
  })
  useEffect(() => {
    getPost(id);
  }, [getPost, id])

  console.log(post);

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    await updatePost(post.id, formData)

    toast.success("Post updated Successfully")


  }



  return (
    <main className="max-w-5xl mx-auto py-10 px-4 my-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 my-10">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">
          Post Details
        </h1>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleUpdatePost}>

          {/* Title */}
          <input
            type="text"
            placeholder="Blog Title..."
            className="w-full text-4xl font-bold outline-none border-b pb-4 rounded-md px-2 py-2 "
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          {/* Subtitle */}
          <input
            type="text"
            placeholder="Short description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />
          <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 mr-4">
            Update
          </button>
          <button onClick={() => deletePost(post.id)} type="button" className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-reds-700">
            Delete
          </button>
        </form>
      </div>
    </main>
  )
}

export default PostsDetails