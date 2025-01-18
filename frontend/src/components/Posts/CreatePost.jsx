import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';

const CreatePost = () => {

    const postMutation = useMutation({
        mutationKey: ['createPost'],
        mutationFn: createPostAPI
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values) => {
            const postData = {
                title: values.title,
                description: values.description
            }
            postMutation.mutate(postData)
        }
    });

  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const error = postMutation.error
  

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post created successfully</p>}
        {isError && <p>{error.message}</p>}
        
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="title" placeholder="Enter title" {...formik.getFieldProps('title')}/>
            {formik.touched.title && formik.errors.title && (<span style={{color: 'red'}}>{formik.errors.title}</span>)}
            <input type="text" name="description" placeholder="Enter description" {...formik.getFieldProps('description')} />
            {formik.touched.description && formik.errors.description && (<span style={{color: 'red'}}>{formik.errors.description}</span>)}
            <button type="submit">Create</button>
        </form>

    </div>
  )
}

export default CreatePost