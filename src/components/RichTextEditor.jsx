import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value || ""}
      onChange={onChange}
      placeholder="Write the course description here..."
    />
  );
};
