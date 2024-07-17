import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
type EditorProps = {
  content: string;
  onChange: (content: string) => void;
};
const TextEditor = ({ content, onChange }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const ReactQuill = dynamic(
    () => {
      return import("react-quill");
    },
    { ssr: false }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <ReactQuill
      // ref={editor}
      //   theme="bubble"
      theme="snow"
      value={content}
      onChange={(value) => onChange(value)}
      readOnly={false}
    />
  );
};

export default TextEditor;
