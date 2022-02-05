import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { passwordUpdateRequest } from "../../../reducers/company/basicInfo.reducer";
import { Grid } from "@material-ui/core";
import { isEmpty, get, isNull, forEach } from "lodash";
import { useForm } from "react-hook-form";
import { Modal, Spinner, Input, Button, FlashMessage } from "../../../components/common";

type Inputs = {
  password: string;
  confirm_password: string;
};

const _ = { isEmpty, get, isNull, forEach };

const UpdatePassword = (props) => {

  const { showModal, handleClose, token } = props;
  const dispatch = useDispatch();
  const confirm_password = useRef({});

  const { basicInfo: { loading, pwdUpdated: pwdUpdateFlag, pwdLoading, errors: updatePwdErrors } } = useSelector(({ company }) => company);

  const { register, handleSubmit, errors, setError, watch } = useForm<Inputs>();
  confirm_password.current = watch("password", "");

  // Invited Admin Hook
  useEffect(() => {
    if (pwdUpdateFlag) {
      handleClose();
      FlashMessage('Password has been updated successfully.');
    }
  }, [pwdUpdateFlag]);

  const onSubmit = (formData) => {
    const payload = {
      invite_token: token,
      ...formData
    }
    dispatch(passwordUpdateRequest({ ...payload }));
  };

  // Sign up error Hook
  useEffect(() => {
    _.forEach(updatePwdErrors, (value, key: any) => {
      setError(key, { type: "manual", message: value });
    });
  }, [updatePwdErrors]);

  return (
    <Modal
      visible={showModal}
      size="large"
      title={`Update Password`}
      loading={loading}
      className="admin-profile-add-modal"
      closeButton={false}
      onClose={handleClose}
      closeOnBackDrop={false}
    >
      <Spinner visible={loading} >
        <div className="add-new-admin-form">
          <div className="search-by-name-section">
            <Grid container spacing={2} className="invite-by-email">
              <Grid item xs={12} sm={12}>
                <form
                  className={"invite-admin-form"}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="password"
                        type="password"
                        externalLabel={{ label: "Password" }}
                        placeholder="Password"
                        validationObj={errors}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please enter password",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="confirm_password"
                        type="password"
                        externalLabel={{ label: "Re-enter Password" }}
                        placeholder="Re-enter Password"
                        validationObj={errors}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please confirm password email",
                          },
                          validate: (value) =>
                            value === confirm_password.current || "The re-entered password do not match",
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} className="text-center">
                      <Button
                        type="submit"
                        color="dark-pink"
                        loading={pwdLoading}
                        className="post-job-btn invite-admin-btn"
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        </div>
      </Spinner>
    </Modal>
  );
};

export default UpdatePassword;