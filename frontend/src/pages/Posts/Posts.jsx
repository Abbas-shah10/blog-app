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
          <div className='flex gap-4'>
            {posts.map((post) => (
              <Link>
                <div className='card px-8 py-8 cursor-pointer'>
                  <h1 className='text-2xl text-blue-500 font-semibold mb-4'>{post.title}</h1>
                  <span className='text-2xl text-gray-400 font-bold mb-4'>{post.desc}</span>
                  <p className='mt-3 text-right text-blue-400'>Created BY : {post.user.username}</p>
                  <p className='mt-3 text-right'>Created At : {formatDate(post.createdAt)}</p>
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