import React from "react";
import "./TagsInput.scss";
import { useState } from "react";
const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTags([...tags, input]);
      setInput("");
    }
  };

  const handleClose = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  return (
    <div className="main_tag_container">
      <div className="tag_contianer">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button onClick={() => handleClose(index)}>
              <img src="/images/icons/tagCloseIcon.svg" alt="" />
            </button>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default TagsInput;
