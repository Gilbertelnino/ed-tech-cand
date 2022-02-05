import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchCompaniesRequest, sendInvitationRequest, searchedAdminReset, sendInvitationByMailRequest, adminListRequest } from "../../../reducers/company/companyAdmins.reducer";
import { IconButton, Typography, Grid } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { isEmpty, get, isNull } from "lodash";
import { useForm } from "react-hook-form";
import { Modal, Spinner, Input, Button, FlashMessage } from "../../../components/common";

let searchDelay: any = null;
type Inputs = {
  first_name: string;
  last_name: string;
  company_email: string;
  confirm_company_email: string;
};

const _ = { isEmpty, get, isNull };

const Form = (props) => {

  const { showModal, handleClose } = props;
  const dispatch = useDispatch();
  const [companyData, setCompanyData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [invitationId, setInvitationId] = useState(0);
  const wrapperRef = useRef(null);
  const confirm_company_email = useRef({});

  const { companyAdmins: { detail, loading, searchLoading, searchedCompanies, invitedflag, invitedByMailflag, inviteByMailLoading } } = useSelector(({ company }) => company);

  const { register, handleSubmit, errors, watch } = useForm<Inputs>();
  confirm_company_email.current = watch("company_email", "");

  /* Hook that alerts clicks outside of the passed ref */
  useEffect(() => {

    /* if clicked on outside of element */
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(searchedAdminReset());
      }
    }

    /* Bind the event listener */
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      /* Unbind the event listener on clean up */
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Invited Employee Hook
  useEffect(() => {
    if (invitedflag) {
      dispatch(searchCompaniesRequest(searchText));
      setSearchText('');
      setInvitationId(0);
    }
  }, [invitedflag]);

  // Invited Admin Hook
  useEffect(() => {
    if (invitedByMailflag) {
      handleClose();
      dispatch(adminListRequest({ page: 1 }));
      FlashMessage('Admin invitation email sent successfully.');
    }
  }, [invitedByMailflag]);

  // Searched Companies Hook
  useEffect(() => {
    setCompanyData(searchedCompanies);
  }, [searchedCompanies]);

  const handleInstantSearch = (text: string) => new Promise(resolve => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      if (!_.isEmpty(text)) {
        setSearchText(text)
        resolve(dispatch(searchCompaniesRequest(text)));
      } else {
        setCompanyData([]);
      }
    }, 1000);
  });

  const sendInvitation = (id: number) => {
    setInvitationId(id);
    dispatch(sendInvitationRequest(id));
  }

  const getOptions = () => {
    const options = companyData.map(c => {
      const firstName = _.get(c, "first_name", "");
      const lastName = _.get(c, "last_name", "");
      const isInvited = _.get(c, "adminInvite", null);
      const cId = _.get(c, "id", "");
      return (
        <div className="search-select-option">
          <p> {firstName} {lastName} </p>
          <p>
            {
              _.isNull(isInvited) ? (<Spinner size={20} visible={invitationId === cId} ><Button className="btn-small" onClick={() => sendInvitation(cId)}>Invite</Button> </Spinner>) : (<Button disabled className="btn-small">Invited</Button>)
            }
          </p>
        </div>
      )
    });
    return options;
  }

  const onSubmit = (formData) => {
    dispatch(sendInvitationByMailRequest({ ...formData }));
  };

  return (
    <Modal
      visible={showModal}
      size="large"
      title={`Add new admin`}
      loading={loading}
      className="admin-profile-add-modal"
      closeButton={showModal}
      onClose={handleClose}
      onClick={() => setCompanyData([])}
    >
      <Spinner visible={loading} >
        <div className="add-new-admin-form">
          <div className="search-by-name-section">
            <Grid container spacing={2} text-align="center" alignItems="center" className="search-by-name-wrapper">
              <Grid item xs={12} ref={wrapperRef}>
                <Typography variant="button" display="block" gutterBottom>
                  Search By Name
                </Typography>
                <Input
                  name="search"
                  className="search-box"
                  placeholder='Search Employee'
                  onKeyUp={(e) => handleInstantSearch(e.target.value)}
                  InputProps={{ endAdornment: <IconButton className="btn-search" >{searchLoading ? "..." : <SearchIcon />}</IconButton> }}
                  disabled={searchLoading}
                />

                {
                  !_.isEmpty(companyData) && (
                    <div className="search-select-wrapper slim-scrollbar">
                      {getOptions()}
                    </div>
                  )
                }
              </Grid>
            </Grid>
            <Grid container spacing={2} className="invite-by-email">
              <Grid item md={12}>
                <Typography variant="button" display="block" gutterBottom>
                  Invite By Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <form
                  className={"invite-admin-form"}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="first_name"
                        externalLabel={{ label: "Legal First Name" }}
                        placeholder="First Name"
                        validationObj={errors}
                        defaultValue={_.get(detail, "first_name", "")}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please enter first name",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="last_name"
                        externalLabel={{ label: "Legal Last Name" }}
                        placeholder="Last Name"
                        validationObj={errors}
                        defaultValue={_.get(detail, "last_name", "")}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please enter last name",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="company_email"
                        externalLabel={{ label: "Company Email" }}
                        placeholder="Company Email"
                        validationObj={errors}
                        defaultValue={_.get(detail, "company_email", "")}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please enter company email",
                          },
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="confirm_company_email"
                        externalLabel={{ label: "Re-enter Company Email" }}
                        placeholder="Re-enter Company Email"
                        validationObj={errors}
                        defaultValue={_.get(detail, "confirm_company_email", "")}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please confirm company email",
                          },
                          validate: (value) =>
                            value === confirm_company_email.current || "The re-entered company email do not match",
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} className="text-center">
                      <Button
                        type="submit"
                        loading={inviteByMailLoading}
                        className="post-job-btn invite-admin-btn primary-btn"
                      >
                        Invite
                      </Button>
                      <Button
                        type="button"
                        className="post-job-btn invite-admin-btn secondary-btn"
                        onClick={handleClose}
                      >
                        Cancel
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

export default Form;
