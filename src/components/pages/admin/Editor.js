import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [checked, setChecked] = useState(false);

  // Initialize Quill editor
  useEffect(() => {
    if (!quillInstance.current && editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],
            ["clean"],
          ],
        },
      });

      quillInstance.current.root.innerHTML = value || "";

      quillInstance.current.on("text-change", () => {
        onChange(quillInstance.current.root.innerHTML);
      });
    }
  }, []); // This effect should run only once on mount, so the empty array is fine here
  

  useEffect(() => {
    if (quillInstance.current && quillInstance.current.root.innerHTML !== value) {
      quillInstance.current.root.innerHTML = value;
    }
  }, []); 

  useEffect(() => {
    if (onChange) {
      quillInstance.current.on("text-change", () => {
        onChange(quillInstance.current.root.innerHTML);
      });
    }
  }, []); // You can leave this dependency array empty to avoid warnings

  return (
    <div className="editor">
      <div ref={editorRef} style={{ minHeight: "200px" }} />
      <label htmlFor="preview" className="mt-2">Preview</label>
      <input
        name="preview"
        id="preview"
        type="checkbox"
        onChange={() => setChecked(!checked)}
      />
      {checked && (
        <div dangerouslySetInnerHTML={{ __html: value }} className="preview mt-4" />
      )}
    </div>
  );
};

export default QuillEditor;
