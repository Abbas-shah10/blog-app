import { useState } from "react";
import usePostStore from "../../app/createPost"
import useAuthStore from "../../app/createAuth";
import { toast } from "react-toastify";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const createPost = usePostStore((state) => state.createPost);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost({ title: title, desc: description, creatorId: user.id })
    toast.success("Post created successfullY!")
    alert("Post created Successfully")
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4 my-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 my-10">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">
          Create New Blog
        </h1>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>

          {/* Title */}
          <input
            type="text"
            placeholder="Blog Title..."
            className="w-full text-4xl font-bold outline-none border-b pb-4 rounded-md px-2 py-2 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Subtitle */}
          <input
            type="text"
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />
          <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Publish
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost