"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4 mx-5">
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  );
};

export default CoverLetterPreview;