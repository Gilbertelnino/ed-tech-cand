import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { Button, ProfileImageCrop, Input, Spinner, ConfirmDialog, UserAvatar, FlashMessage } from "../../components/common";
import appRoutes, { companyPrefix } from "../../routes/app.routes";
import unknownProfile from "../../assets/images/unknownProfile.jpeg";
import AddIcon from "@material-ui/icons/Add";
import { Scrollbars } from "react-custom-scrollbars";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import _ from "lodash";
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from "@material-ui/lab/Pagination";
import {
	peopleReset, peopleAddFilter, peopleListRequest,
	peopleDetailReset, createPeopleRequest, updatePeopleRequest,
	deletePeopleRequest, peopleErrorsReset, resetDeletePeople
} from "../../../src/reducers/people/people.reducer";
import { ImageMimeTypes } from "../../utils/appConstants";
import { readFile } from "../../utils/cropImageHelper";

type Inputs = {
	id?: number;
	leader_name: string;
	job_title: string;
	company_email: string;
	image: any;
};

const PeopleList = (props) => {

	const { isPublic } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const [page, setPage] = useState(1);
	const [peopleId, setPeopleId] = useState(null);
	const [isDeleteModalShow, setDeleteModalShow] = useState(false);
	const [isDeletePeopleId, setDeletePeopleId] = useState(0);
	const [picture, setPicData] = useState(null);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);
	const [showCropImage, setShowCropImage] = useState(false);
	const [cropImage, setCropImage] = useState(null);
	const [finalImageBlob, setFinalImageBlob] = useState<Blob>();

	const refSave = useRef(null);
	const { register, handleSubmit, setValue, errors, setError, reset } = useForm<Inputs>();
	const {
		people: {
			loading, createFlag, deleteflag: peopleDeleteFlag,
			updateflag, updateErrors, createErrors,
			peopleFilter: peopleFilter,
			uploadLoading, updateLoading, createLoading,
			deleteLoading, deleteMessage
		},
	} = useSelector(({ people }: any) => people);
	const { people } = useSelector(({ people }: any) => people);
	const { companyProfile: { data: { slug } } } = useSelector(({ company }: any) => company);
	const data = _.get(people, "data", []);
	const pagination = _.get(people, "pagination", {});

	useEffect(() => {
		const companySlug = _.get(props, "match.params.slug", undefined);
		dispatch(peopleListRequest({ ...peopleFilter, isPublic, companySlug }));
		// props.setButtonClick(handleButtonClick);
	}, []);

	// People Filter Hook
	useEffect(() => {
		if (!_.isEmpty(peopleFilter)) {
			const companySlug = _.get(props, "match.params.slug", undefined);
			dispatch(peopleListRequest({ ...peopleFilter, isPublic, companySlug }));
		}
	}, [peopleFilter]);

	// Hook, People create errors
	useEffect(() => {
		if (!_.isEmpty(createErrors)) {
			_.forEach(createErrors, (value, key: any) => {
				setError(key, { type: "manual", message: value });
			});

			dispatch(peopleErrorsReset());
		}
	}, [createErrors]);

	// Hook, People update errors
	useEffect(() => {
		if (!_.isEmpty(updateErrors)) {
			_.forEach(updateErrors, (value, key: any) => {
				setError(key, { type: "manual", message: value });
			});

			dispatch(peopleErrorsReset());
		}
	}, [updateErrors]);

	// Create People success Hook
	useEffect(() => {
		if (createFlag === true) {
			resetForm();
			dispatch(peopleReset());
			dispatch(peopleListRequest({ ...peopleFilter }));
		}
	}, [createFlag]);

	// Update People success Hook
	useEffect(() => {
		if (updateflag === true) {
			resetForm();
			dispatch(peopleReset());
			dispatch(peopleListRequest({ ...peopleFilter }));
		}
	}, [updateflag]);

	// Delete People success Hook
	useEffect(() => {
		if (peopleDeleteFlag === true || peopleDeleteFlag === false) {

			if (peopleDeleteFlag === true) {
				dispatch(peopleReset());
				dispatch(peopleDetailReset());
				dispatch(peopleListRequest({ ...peopleFilter }));
			} else {
				if (deleteMessage) {
					FlashMessage(deleteMessage, "error");
				}
			}
			handleDeleteModalClose();
			dispatch(resetDeletePeople());
		}
	}, [peopleDeleteFlag]);

	const handleButtonClick = (type) => {
		switch (type) {
			case "Save":
				refSave.current.click();
				break;
			case "Preview":
				setProfilePreview()
				break;
			default:
				break;
		}
	};

	const setProfilePreview = () => {
		if (slug) {
			const win = window.open(appRoutes.companyPublicPagePeople.generatePath(slug), "_blank");
			win.focus();
		}
	}

	const handlePaginationChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
		dispatch(peopleAddFilter({ ...peopleFilter, page: value }));
	};

	const handleEdit = (formData) => {
		if (formData) {
			setPeopleId(_.get(formData, "id", 0));
			setPicData(_.get(formData, "image", ""))
			setValue("job_title", _.get(formData, "job_title", ""));
			setValue("leader_name", _.get(formData, "leader_name", ""));
			setValue("company_email", _.get(formData, "company_email", ""));
		}
	};

	const handleDelete = () => {
		dispatch(deletePeopleRequest(isDeletePeopleId));
	};

	const handleDeleteModalOpen = (_id) => {
		setDeletePeopleId(_id);
		setDeleteModalShow(true);
	};

	const handleDeleteModalClose = () => {
		setDeletePeopleId(0);
		setDeleteModalShow(false);
	};

	const resetForm = () => {
		reset({});
		setPicData(null);
		setPeopleId(null)
		setFinalImageBlob(null);
		setCropImage(null);
	};

	const onChangePicture = async (e) => {

		if (!_.isEmpty(e.target.files)) {

			const file = e.target.files[0];
			const fileType = file.type;

			if (ImageMimeTypes.includes(fileType)) {
				const imageDataUrl = await readFile(file)
				setCropImage(imageDataUrl)
				setShowCropImage(true);
			} else {
				FlashMessage("Please select valid png or jpeg file", "error");
			}
		}
	};

	const onSubmit = (formData) => {

		const payload = new FormData();

		if (finalImageBlob) {
			payload.append("image", finalImageBlob, "croppedImage.png");
		}

		payload.append("leader_name", formData.leader_name);
		payload.append("company_email", formData.company_email);
		payload.append("job_title", formData.job_title);

		if (peopleId) {
			payload.append("id", peopleId);
			dispatch(updatePeopleRequest({
				id: peopleId,
				formData: payload
			}));
		} else {
			payload.append("display_on_company_page", "0");
			dispatch(createPeopleRequest(payload));
		}
	};

	const handleCropImage = async (blobData) => {
		setFinalImageBlob(blobData);
		const src = URL.createObjectURL(blobData);
		setPicData(src);
	}

	const getPeopleDeleteModal = () => {
		return (
			<ConfirmDialog
				visible={isDeleteModalShow}
				loading={deleteLoading}
				bodyText="Are you sure you want to delete this record?"
				onCancel={() => handleDeleteModalClose()}
				onConfirm={() => handleDelete()}
			/>
		);
	};

	const getCards = () => {
		let cards = [];
		if (loading) {
			cards = [1, 2, 3, 4].map((i) => {
				return (
					< Grid item xs={6} sm={3} lg={2} >
						<Paper className={"profile-paper"}>
							<div className="profile-picture">
								<Skeleton variant="circle" height={100} width={100}>
									<UserAvatar size="md" variant="circle" />
								</Skeleton>
							</div>
							<p className="profile-name"><Skeleton className="profile-name-skeleton" width={100} /></p>
							<p className="job-title"><Skeleton className="job-title-skeleton" width={150} /></p>
							{_.isUndefined(isPublic) && (
								<div className="profile-action">
									<Skeleton width={60} className="edit-btn-skeleton" />
									<Skeleton width={80} className="delete-btn-skeleton" />
								</div>
							)}
						</Paper>
					</Grid >
				)
			});
		} else {
			cards = data.map((s) => {
				const imagePath = _.isEmpty(s.image) ? unknownProfile : s.image;
				return (
					<Grid item xs={6} sm={3} lg={2}>
						<Paper className={"profile-paper"}>
							<div className="profile-picture">
								<img className="profile-image" src={imagePath} />
							</div>
							<p className="profile-name">{_.get(s, "leader_name", "")}</p>
							<p className="job-title">{_.get(s, "job_title", "")}</p>
							{_.isUndefined(isPublic) && (
								<div className="profile-action">
									<Button
										className="edit-btn"
										onClick={() => handleEdit(s)}
									>
										Edit
									</Button>
									<Button
										className="delete-btn"
										onClick={() => handleDeleteModalOpen(_.get(s, "id", 0))}
									>
										Delete
									</Button>
								</div>
							)}
						</Paper>
					</Grid>
				);
			});
		}
		return cards;
	};

	const getPeopleList = () => {
		const imageClass = _.isEmpty(picture) ? "select-profile" : "select-profile selected-profile";
		return (
			<Scrollbars
				renderThumbHorizontal={() => <div />}
				renderView={({ children }) => (
					<div className="people-list-wrapper">{children}</div>
				)}
				className="people-list-scroller"
			>
				<div className="people-list-container">
					{_.isUndefined(isPublic) && (
						<>
							<form
								className={"add-people-form"}
								noValidate
								onSubmit={handleSubmit(onSubmit)}
							>
								<Grid className="people-form-wrapper">
									<Grid item xs={4} sm={2} md={2} lg={1}>
										<Spinner visible={uploadLoading} loadingTip={""}>
											<div className={imageClass}>
												<Input
													className="select-profile-btn"
													inputRef={register}
													name="image"
													type="file"
													onChange={(e) => onChangePicture(e)}
												/>
												<span>
													{_.isEmpty(picture) ? (
														<AddIcon />
													) : (
														<img src={picture} className="people-img" />
													)}
												</span>
											</div>
										</Spinner>
									</Grid>
									<Grid item xs={6} sm={6} md={4} className="people-form-area">
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
										/>
										<Input
											name="company_email"
											placeholder="Company email"
											className="company-email"
											validationObj={errors}
											inputRef={register({
												required: {
													value: true,
													message: "Please enter company email",
												},
											})}
										/>
										<Grid item xs={12} className="btn-form-reset p-relative">
											&nbsp;

											{(updateLoading || createLoading) && (
												<div data-save>
													<CircularProgress />
													<span>Saving...</span>
												</div>
											)}
											{(peopleId) && (
												<span
													className="span-link"
													onClick={() => resetForm()}
												>
													Reset
												</span>
											)}
										</Grid>
									</Grid>
									<button
										type="submit"
										ref={refSave}
										className="d-none"
									/>
								</Grid>
							</form>
							{!_.isEmpty(data) && <p className="all-people-label">ALL</p>}
						</>
					)}
					<Grid className="people-list" container spacing={2}>
						{getCards()}
					</Grid>
					{setPagination()}

					<ProfileImageCrop
						visible={showCropImage}
						cropImage={cropImage}
						onClose={() => setShowCropImage(false)}
						onCrop={(data) => handleCropImage(data)}
					/>
				</div>
				{getPeopleDeleteModal()}
			</Scrollbars>
		);
	};
	const getPublicPeopleList = () => {
		return (
			<div className="people-list-wrapper">
				<div className="people-list-container">
					<Grid className="people-list" container spacing={2}>
						{getCards()}
					</Grid>
					{setPagination()}
					<div className="mb-20"></div>
				</div>
			</div>
		);
	};

	const setPagination = () => {
		return (
			<Grid container justify="center">
				{!_.isEmpty(data) && (
					<Pagination
						count={_.get(pagination, "total", 0)}
						defaultPage={page}
						variant="outlined"
						color="secondary"
						className="jobs-pagination"
						onChange={(e, value) => handlePaginationChange(e, value)}
					/>
				)}
			</Grid>
		)
	}

	return _.isUndefined(isPublic) ? getPeopleList() : getPublicPeopleList();
};

export default PeopleList;
