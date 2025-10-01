"use client"
import { createNewPost } from "@/app/lib/actions";
import React, { useState } from "react";
import { lusitana } from "@/app/ui/general/fonts";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "public/styles.css"

const PostInput: React.FC = () => {
  const [postContent, setPostContent] = useState("");

  // Quill-React Configuration
  const theme = "bubble";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "image"],
    ],
  };
  const placeholder = " What is going on?";
  const formats = ["bold", "italic", "underline", "strike", "image"];
  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    if(quill !== undefined && quill!.getText().trim().length !== 0) {
      createNewPost(quill.getSemanticHTML());
    }
    quill?.setText("");
    setPostContent("");
  };

  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
          <form onSubmit={handleSubmit}>
            <div style={{ height: 200, border: "none" }}>
              <div ref={quillRef} />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 mb-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
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
