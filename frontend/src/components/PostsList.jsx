import React from 'react'
import { useQuery } from '@tanstack/react-query';
import {fetchAllPosts} from '../APIServices/posts/postsAPI'

const PostsList = () => {
    
    const {isError, isLoading, data, error, isSuccess, refetch} =useQuery({
        queryKey: ['lists-posts'],
        queryFn: fetchAllPosts
    });

    const postMutation = useMutation({
        mutationKey: ["delete-post"],
        mutationFn: deletePostAPI,
      });

      const deleteHandler = async (postId) => {
        postMutation
          .mutateAsync(postId)
          .then(() => {
            refetch();
          })
          .catch((e) => console.log(e));
    
      };
  
    return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Posts fetched successfully</p>}
        {error && <p>{error.message}</p>}
    {data?.posts.map((post) => {
        return(
            <div key={post._id}>
                <h1>{post?.title}</h1>
                <p>{post?.description}</p>
                <Link to={`/posts/${post._id}`}>
                    <button>Edit</button>
                </Link>
            </div>
        )
    })}
    </div>
  )
}

export default PostsList