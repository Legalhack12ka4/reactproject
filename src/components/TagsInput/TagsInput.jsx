import React, { useRef } from "react";
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



  const [editingIndex, setEditingIndex] = useState(null);
  const tagRef = useRef(null);

  const handleTagClick = (index) => {
      setEditingIndex(index);
      tagRef.current.focus();
  }
  const handleTagBlur = (event, index) => {
    setEditingIndex(null);
    const newTags = [...tags];
    newTags[index] = event.target.innerText;
    setTags(newTags);
  }
  console.log(tags)

  return (
    <div className="main_tag_container">
      <div className="tag_contianer">
        {tags.map((tag, index) => (
           <div
           key={index}
           className={`tag ${editingIndex === index && "editing"}`}
           contentEditable={editingIndex === index}
           onClick={() => handleTagClick(index)}
           onBlur={(event) => handleTagBlur(event, index)}
         >
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
