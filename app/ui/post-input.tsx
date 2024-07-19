'use client'
import { useState } from 'react';
import { createNewPost } from "@/app/lib/actions"

const PostInput: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('New Post:', postContent);
    if(postContent != "") {
      createNewPost(postContent);
    }
    setPostContent('');
  };

  return (
    <div className="max-w-md my-4 p-4 border border-gray-300 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostInput;
