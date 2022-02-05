import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { Input, Spinner, Button } from "../../components/common";
import { get, isUndefined, forEach, isEmpty, isObject } from "lodash";
import {
  peopleDetailReset,
  createPeopleRequest,
  updatePeopleRequest,
  uploadPeopleFileRequest
} from "../../reducers/people/people.reducer";
import { rootReducersState } from "../../reducers";

const _ = { isUndefined, get, forEach, isEmpty, isObject };

type Inputs = {
  id: number;
  leader_name: string;
  job_title: string;
  company_email: string;
  image: any;
};

const PeopleForm = (props) => {

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);

  const { fromCompany, setDetail, refSave, series } = props;
  const dispatch = useDispatch();
  const [picture, setPicData] = useState(null);
  const userData = _.get(sessionReducer, "currentUser", {});
  const isParentAdmin = _.get(userData, "parent_id", 0) === null;
  const { register, handleSubmit, errors, setValue, setError, reset } =
    useForm<Inputs>();

  const {
    people: {
      uploadLoading,
      fileSeries,
      fileNames,
      detail: peopleDetail,
      errors: peopleErrors,
    },
  } = useSelector(({ people }: any) => people);

  const detail = setDetail ? setDetail : peopleDetail;

  // Get people detail Hook
  useEffect(() => {
    !_.isEmpty(peopleDetail) && setEditForm(peopleDetail);
  }, [peopleDetail]);
  useEffect(() => {
    !_.isEmpty(setDetail) && setEditForm(setDetail);
  }, [setDetail]);

  // People error Hook
  useEffect(() => {
    _.forEach(peopleErrors, (value, key: any) => {
      setError(key, { type: "manual", message: value });
    });
  }, [peopleErrors]);

  const setEditForm = (detail: object) => {
    setValue("id", _.get(detail, "id", 0));
    setValue("job_title", _.get(detail, "job_title", ""));
    setValue("leader_name", _.get(detail, "leader_name", ""));
    setValue("company_email", _.get(detail, "company_email", ""));
  };

  const handleReset = () => {
    reset();
    dispatch(peopleDetailReset());
  };

  const resetImageField = () => {
    setPicData(null);
  };

  const onChangePicture = (e, series) => {
    const file = _.get(e, "target.files[0]", {});
    if (_.isObject(file)) {
      const payload = new FormData();
      payload.append("uploadType", "image");
      payload.append("files", file);
      const param = { series: series, payload: payload }
      dispatch(uploadPeopleFileRequest({ ...param }));
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicData(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formData) => {

    const _id = _.get(formData, "id", "0");
    const image = !_.isEmpty(fileNames[series]) ? { image: fileNames[series] } : {};
    const display_on_company = fromCompany === true ? { display_on_company_page: 1 } : {};
    let payload = {
      ...image,
      ...display_on_company,
      leader_name: _.get(formData, "leader_name", ""),
      job_title: _.get(formData, "job_title", ""),
      company_email: _.get(formData, "company_email", ""),
    };
    if (_id === "0") {
      dispatch(createPeopleRequest(payload));
    } else {
      payload = { ...payload, id: _id };
      dispatch(updatePeopleRequest(payload));
    }
    resetImageField();
  };

  const imageClass = _.isEmpty(picture) ? "select-profile" : "select-profile selected-profile";
  const picturePath = !_.isEmpty(picture) ? picture : !_.isEmpty(detail.image) ? _.get(detail, "image", "") : "";
  const peopleClass = isParentAdmin ? '' : 'people-form-disabled';
  return (
    <form
      className={`add-people-form ${peopleClass}`}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid className="people-form-wrapper">
        <Grid item xs={4} sm={4} md={2} lg={2}>
          <Spinner visible={uploadLoading && series === fileSeries} >
            <div className={imageClass}>
              <Input
                className="select-profile-btn"
                inputRef={register}
                name="tmpimage"
                type="file"
                onChange={(e) => onChangePicture(e, series)}
                disabled={!isParentAdmin}
              />
              <span>
                {_.isEmpty(picturePath) ? (
                  <AddIcon />
                ) : (
                  <img src={picturePath} className="people-img" />
                )}
              </span>
            </div>
          </Spinner>
        </Grid>
        <Grid item xs={8} sm={8} md={7} lg={8} className="people-form-area">
          <Input
            name="id"
            className="people-id"
            inputRef={register}
            defaultValue={detail.id || 0}
          />
          <Input
            name="leader_name"
            placeholder="Leader’s name"
            className="leader-name"
            validationObj={errors}
            inputRef={register({
              required: {
                value: true,
                message: "Please enter leader’s name",
              },
            })}
            disabled={!isParentAdmin}
          />
          <Input
            name="job_title"
            placeholder="Job title"
            className="job-title"
            validationObj={errors}
            inputRef={register({
              required: {
                value: true,
                message: "Please enter job title",
              },
            })}
            disabled={!isParentAdmin}
          />
          <Input
            name="company_email"
            placeholder="Invite employee via company email"
            className="company-email"
            validationObj={errors}
            inputRef={register({
              required: {
                value: true,
                message: "Please enter company email",
              },
            })}
            disabled={!isParentAdmin}
          />
          {!_.isEmpty(detail) && !fromCompany && (
            <Grid item xs={12} className="btn-form-reset">
              <Button
                variant="outlined"
                color="secondary"
                className="btn-reset"
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </Grid>
          )}
        </Grid>
        <button
          type="submit"
          ref={refSave}
          className="people-form-save-btn"
        />
      </Grid>
    </form>
  );
};
export default PeopleForm;
