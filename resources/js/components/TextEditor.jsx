import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const TextEditor = ({ onChange, placeholder, value }) => {
    return (
        <div className="max-h-[47vh] overflow-y-auto">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default TextEditor
