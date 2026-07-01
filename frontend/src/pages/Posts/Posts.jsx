import { useEffect, useState } from 'react';
import usePostStore from '../../app/createPost'
import { Link } from 'react-router-dom';

const Posts = () => {
  const [error, setLoading] = useState(false);
  const posts = usePostStore((state) => state.posts)
  const getAllPosts = usePostStore((state) => state.getAllPosts)
  console.log(posts)

  const formatDate = (dateStr) => {
    if (!dateStr) return;
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    getAllPosts()
  }, [])



  return (
    <div className="p-3 absolute top-20 my-12 w-full">
      {/* <div className="relative">
        <img
          src={posts.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div> */}

      {
        posts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {posts.map((post) => (
              <Link>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <h1 className='text-2xl text-blue-500 font-semibold mb-4'>{post.title}</h1>
                  <p className="mt-2 text-slate-600 line-clamp-3">
                    {post.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500 border-t pt-4">
                    <span>👤 {post.user.username}</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='p-3 absolute my-12 w-[100%] text-center text-5xl text-red-400'>
            {error ? "OOP's, Something went wrong in Server" : ""}
          </div>
        )
      }

    </div>
  )
}

export default Posts