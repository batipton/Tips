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
    if(postContent != "") {
      createNewPost(postContent);
    }
    setPostContent('');
  };

  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                className="w-full p-2 mt-2 border-none rounded-md resize-none"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mb-2 bg-green-500 hover:bg-green-400 text-white rounded-md"
            >
              Post
            </button>
          </form> 
        </div>
    </div>
  );
};

export default PostInput;
