import React from "react";
import TextEditor from '../../../components/common/TextEditor';
import Modal from '../../../components/common/Modal';
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import _ from "lodash";

type Inputs = {
  telescript: boolean;
};

const ScriptEditorModal = (props) => {

  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = (fromData) => {
    if (typeof props.onSubmit === 'function') {
      props.onSubmit(fromData.telescript);
    }
  }

  return (
    <Modal
      visible={props.status}
      size="large"
      className="tele-script-modal"
      closeButton={true}
      closeButtonCross={true}
      onClose={() => props.handleOnClose()}
    >
      <form
        className="text-editor-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >

        <TextEditor
          defaultValue={_.get(props, "value", "")}
          name="telescript"
          className="tele-script"
          placeholder="Add your teleprompter script"
          validationObj={errors}
          inputRef={register}
        />
        <div className="submit-btn-container">
          <Button type="submit" className="primary-btn">Save</Button>
        </div>
      </form>
    </Modal>
  )
}

export default ScriptEditorModal;
