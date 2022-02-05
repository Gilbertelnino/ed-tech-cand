import React, { useState } from "react";
import {
  Button, Checkbox, Input, ConfirmDialog, ErrorTextHelper, MessageHelper
} from "../../components/common";
import Container from '@material-ui/core/Container';

const UIElements = () => {

  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState<boolean>(false);

  return (
    
    <Container fixed>
    <div className="bg-pink-circle"></div>
    <div className="default-content">
        <h2 className="section-title">
          Section Title
        </h2>
        <div className="shadow-box">
              <h1>H1</h1>
              <h2>H2</h2>
              <h3>H3</h3>
              <h4>H4</h4>
              <h5>H5</h5>
              <h6>H6</h6>
              <div className="pb-25" />
              <a href="#" className="link">Link</a>
              <a href="#" className="link pink">Link</a>
              <div className="pb-25" />
              <label>Label</label>
              <div className="pb-25" />
              <Button >Primary</Button>
              <Button rounded>Rounded</Button>
              <Button color="secondary">Secondary</Button>
              <div className="pb-25" />
              <label>
                Checkbox
                <Checkbox name="checkbox" />
              </label>
              <div className="pb-25" />
              <Input name="input" />
              <div className="pb-25" />
              <Button color="secondary" onClick={() => setVisibleConfirmDialog(true)}>Confirm Dialog</Button>
              <div className="pb-25" />
              <ErrorTextHelper text="Error text helper" />
              <div className="pb-25" />
              <MessageHelper type="success" text="Success Message helper" />
              <br />
              <MessageHelper type="error" text="Error Message helper" />
              <div className="pb-25" />




              <div className="pb-25" />
                  <ConfirmDialog
                    visible={visibleConfirmDialog}
                    onCancel={() => setVisibleConfirmDialog(false)}
                    onConfirm={() => setVisibleConfirmDialog(false)}
                    bodyText="This is body text"
                  >*This is Children text should be in next line*</ConfirmDialog>
              </div>
    </div>
      
    </Container>
  )
};

export default UIElements;
