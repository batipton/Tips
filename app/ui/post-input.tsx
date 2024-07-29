'use client'
import { createNewPost } from "@/app/lib/actions";
import React, { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'public/styles.css'

const PostInput: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  // Quill-React Configuration
  const theme = 'bubble';
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'image'],
    ],
  };
  const placeholder = ' What is going on?';
  const formats = ['bold', 'italic', 'underline', 'strike', 'image'];
  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(postContent);
    if(quill !== undefined && quill!.getText() != "") {
      createNewPost(quill.getSemanticHTML());
    }
    setPostContent('');
  };

  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <form onSubmit={handleSubmit}>
            <div style={{ height: 200, border: 'none' }}>
              <div ref={quillRef} />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 mb-2 mt-4 bg-green-500 hover:bg-green-400 text-white rounded-md"
              >
                Post
              </button>
            </div>
          </form> 
        </div>
    </div>
  );
};

export default PostInput;
