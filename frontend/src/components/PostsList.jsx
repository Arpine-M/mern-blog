import React from 'react'
import { useQuery } from '@tanstack/react-query';
import {fetchAllPosts} from '../APIServices/posts/postsAPI'

const PostsList = () => {
    
    const {isError, isLoading, data, error, isSuccess} =useQuery({
        queryKey: ['lists-posts'],
        queryFn: fetchAllPosts
    });

    
  
    return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Posts fetched successfully</p>}
        {error && <p>{error.message}</p>}
    {data?.posts.map((post) => {
        return(
            <div>
                <h1>{post?.title}</h1>
                <p>{post?.description}</p>
            </div>
        )
    })}
    </div>
  )
}

export default PostsList