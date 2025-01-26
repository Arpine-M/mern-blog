import React from 'react'
import { useQuery } from '@tanstack/react-query';
import {fetchAllPosts} from '../APIServices/posts/postsAPI';
import { useMutation } from '@tanstack/react-query';
import { deletePostAPI } from '../APIServices/posts/postsAPI';
import { Link } from 'react-router-dom';
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
                
                <div 
                 dangerouslySetInnerHTML={{__html: post?.description}}
                />
                <Link to={`/posts/${post._id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => deleteHandler(post._id)}>Delete</button>
            </div>
        )
    })}
    </div>
  )
}

export default PostsList