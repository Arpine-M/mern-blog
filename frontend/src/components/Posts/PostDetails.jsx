import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
    const {postId} = useParams();

    const{isError, data, error, isLoading, isSuccess} = useQuery({
        queryKey: ['post-details'],
        queryFn: () => fetchPost(postId)
    });
  return (
    <div>
        <h1>{data?.postFound.title}</h1>
        <p>{data?.postFound.description}</p>
    </div>
    
  );
}

export default PostDetails