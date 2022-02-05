import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { get, chain } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";
const _ = { get, chain };

// We will explicity destruct props which are not Mui props or want to manipulates
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface externalLabel {
  [key: string]: any;
}
interface TextEditorProps {
  // Primary props
  name: string;
  // Validation handling (NOTE: only supports react-hook-form for the moment)
  externalLabel?: externalLabel;
  validationObj?: object;
  // other props of the component which directly used in component
  [key: string]: any;
}

const TextEditor = ({ name, validationObj, className, placeholder, ...props }: TextEditorProps) => {
  //  External label
  const externalLabel = _.get(props, "externalLabel.label", "") || "";
  let externalLabelClass = _.get(props, "externalLabel.className", "") || "";
  const externalLabelClasses = _.chain([externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

  // Error message
  const errorMessage = _.get(validationObj, `${name}.message`, null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [value, setValue] = useState("");

  useEffect(() => {
    const html = props.defaultValue || "";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, []);

  useEffect(() => {
    const originalValue = draftToHtml(convertToRaw(editorState.getCurrentContent())) || "";
    const sensitizedValue = originalValue.indexOf("<p></p>") === 0 ? "" : originalValue;
    setValue(sensitizedValue);
  }, [editorState]);

  return (
    <>
      {externalLabel && (
        <label htmlFor={props.name} className={externalLabelClasses}>
          {externalLabel}
        </label>
      )}
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorClassName={className}
        placeholder={placeholder}
        toolbar={{
          options: ["blockType", "inline", "list", "fontSize"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
          },
          blockType: {
            inDropdown: false,
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
          },
        }}
      />
      <textarea
        name={name}
        style={{ opacity: "0" }} // TODO (Keval) - Need to move into utils class
        ref={props.inputRef}
        value={value}
      />
      {errorMessage && <ErrorTextHelper text={errorMessage} />}
    </>
  );
};

// Default props of the component
TextEditor.defaultProps = {
  inlineToolbar: true,
};

export default TextEditor;
