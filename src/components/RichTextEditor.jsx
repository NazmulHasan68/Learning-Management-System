
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const RichTextEditor=({input , setinput}) =>{
    
    const handleChange = (content) =>{
        setinput({...input, description:content})
    }
  return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
}