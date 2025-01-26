import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {

    const[description, setDescription ] = useState('')

    const postMutation = useMutation({
        mutationKey: ['createPost'],
        mutationFn: createPostAPI
    })

    const formik = useFormik({
        initialValues: {
        
            description: ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values) => {
            const postData = {
                description: values.description
            }
            postMutation.mutate(postData)
        }
    });

  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const error = postMutation.error
  const errorMsg = postMutation?.error?.response?.data?.message

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post created successfully</p>}
        {isError && <p>{errorMsg}</p>}
        
        <form onSubmit={formik.handleSubmit}>
            <ReactQuill
            value={formik.values.description}
            onChange={(value) => {
                setDescription(value);
                formik.setFieldValue('description', value)}}
            />
            {formik.touched.description && formik.errors.description && (<span style={{color: 'red'}}>{formik.errors.description}</span>)}
            <button type="submit">Create</button>
        </form>

    </div>
  )
}

export default CreatePost