import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";
import Pagination from "@material-ui/lab/Pagination";
import {
	jobListRequest,
	getJobRequest,
	jobReset,
	jobDetailReset,
	deleteJobRequest,
	archiveJobRequest,
	jobAddFilter,
} from "../../../reducers/job/jobs.reducer";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	IconButton,
} from "@material-ui/core";
import { get, forEach, isEmpty, isUndefined, omit } from "lodash";
import NoJobsFound from "./NoJobsFound";
import { formatDate } from "../../../utils/helper";
import FilterListIcon from "@material-ui/icons/FilterList";
import Spinner from "../../../components/common/Spinner";
import Form from "./Form";
import Archive from "./Archive";

const _ = { get, forEach, isEmpty, isUndefined, omit };

interface Column {
	id:
	| "title"
	| "status"
	| "external_link"
	| "candidates"
	| "location"
	| "jobStatus"
	| "created_at"
	| "actions";
	label: any;
	minWidth?: number;
	align?: "right";
	format?: (value: any) => any;
}

const JobList = (props) => {
	const [statusSort, setStatusSort] = useState(false);
	const [dateSort, setDateSort] = useState(false);
	const [isArchiveJobId, setArchiveJobId] = useState(0);
	const [isArchiveModalShow, setArchiveModalShow] = useState(false);
	const dispatch = useDispatch();
	const open = _.get(props, 'open', false);
	const page = _.get(props, 'page', 1);
	const setPage = _.get(props, 'setPage', null);
	const handleOpen = _.get(props, 'handleOpen', null);
	const handleClose = _.get(props, 'handleClose', null);

	const {
		jobs: {
			data,
			loading,
			pagination,
			detailLoading,
			flag: jobFlag,
			deleteflag: jobDeleteFlag,
			updateflag: updateflag,
			archiveflag: archiveflag,
			errors: jobErrors,
			jobFilter: jobFilter,
		},
	} = useSelector(({ job }: any) => job);
	const { companyProfile: { data: { slug } } } = useSelector(({ company }: any) => company);

	const handleSortByStatus = () => {
		setStatusSort(!statusSort);
		const payload = {
			...jobFilter,
			orderField: "status",
			orderBy: statusSort ? "asc" : "desc",
		};
		dispatch(jobAddFilter({ ...payload }));
	};

	const handleSortByDate = () => {
		setDateSort(!dateSort);
		const payload = {
			...jobFilter,
			orderField: "created_at",
			orderBy: dateSort ? "asc" : "desc",
		};
		dispatch(jobAddFilter({ ...payload }));
	};

	const columns: Column[] = [
		{
			id: "title",
			label: "Title",
			minWidth: 170,
		},
		{
			id: "location",
			label: "Location",
			minWidth: 100,
		},
		{
			id: "jobStatus",
			label: (
				<>
					{" "}
					{"Status"}{" "}
					<FilterListIcon
						className={`filter-icon ${statusSort && "filter-desc"}`}
						onClick={() => handleSortByStatus()}
					/>{" "}
				</>
			),
			minWidth: 80,
			format: (value) => {
				return _.get(value, "title", "");
			},
		},
		{
			id: "created_at",
			label: (
				<>
					{"Date Published"}
					<FilterListIcon
						className={`filter-icon ${dateSort && "filter-desc"}`}
						onClick={() => handleSortByDate()}
					/>
				</>
			),
			minWidth: 100,
			format: (value) => {
				return formatDate(value);
			},
		},
		{
			id: "actions",
			label: "Actions",
			minWidth: 80,
		},
	];

	// Fetch Jobs Hook
	useEffect(() => {
		const path = _.get(props, "location.pathname", "");
		let payload = { public: path.includes("drafts") ? "0" : "1" };

		if (path.includes("archive")) {
			payload = { ...jobFilter, archive: "1", page };
			const param = _.omit(payload, ["public"]);
			dispatch(jobListRequest({ ...param }));
		} else if (!_.isEmpty(jobFilter)) {
			dispatch(jobListRequest({ ...jobFilter, ...payload, page }));
		} else if (slug) {
			dispatch(jobListRequest({ ...payload, page }));
		}

		//props.setButtonClick(handleButtonClick);
	}, [slug, jobFilter]);

	// Create Job success Hook
	useEffect(() => {
		if (jobFlag === true) {
			handleClose();
			const path = _.get(props, "location.pathname", "");
			if (!path.includes("archive")) {
				dispatch(jobListRequest({ ...jobFilter }));
			}
		}
	}, [jobFlag]);

	// Update Job success Hook
	useEffect(() => {
		if (updateflag === true) {
			handleClose();
			const path = _.get(props, "location.pathname", "");
			if (!path.includes("archive")) {
				dispatch(jobListRequest({ ...jobFilter }));
			}
		}
	}, [updateflag]);

	// Archive Job success Hook
	useEffect(() => {
		if (archiveflag === true) {
			handleArchiveModalClose();
			dispatch(jobListRequest({ ...jobFilter }));
		}
	}, [archiveflag]);

	// Delete Job success Hook
	useEffect(() => {
		if (jobDeleteFlag === true) {
			dispatch(jobReset());
			dispatch(jobListRequest({ ...jobFilter }));
		}
	}, [jobDeleteFlag]);

	const handleArchiveModalOpen = (_id) => {
		setArchiveJobId(_id);
		setArchiveModalShow(true);
	};

	const handleArchiveModalClose = () => {
		setArchiveModalShow(false);
	};

	const handleDelete = (id) => {
		dispatch(deleteJobRequest(id));
	};

	const handleJobArchived = () => {
		dispatch(archiveJobRequest(isArchiveJobId));
	};

	const handlePaginationChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
		dispatch(jobAddFilter({ ...jobFilter, page: value }));
	};

	return (
		<>
			<Paper>
				{_.isEmpty(data) ? (
					<NoJobsFound handleClick={() => handleOpen()} displayAddNewJob={true} />
				) : (
					<Scrollbars
						renderThumbHorizontal={() => <div />}
						renderView={({ children }) => (
							<TableContainer className="job-list-wrapper">
								{children}
							</TableContainer>
						)}
						className="job-list-scroller"
					>
						<Spinner visible={loading} loadingTip={""}>
							<Table stickyHeader aria-label="job listing table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{(data || []).map((row) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
												{columns.map((column) => {
													if (column.id === "actions") {
														return (
															<TableCell
																className="actions"
																key={"actions"}
																align={"center"}
															>
																{/* <Tooltip title="Edit"> */}
																<IconButton
																	aria-label="edit"
																	onClick={() => handleOpen(row.id)}
																	title="Edit"
																	disableRipple
																>
																	<EditIcon />
																</IconButton>
																{!row.is_archived && (
																	// <Tooltip title="Archive">
																	<IconButton
																		aria-label="archive"
																		title="Archive"
																		onClick={() =>
																			handleArchiveModalOpen(row.id)
																		}
																		disableRipple
																	>
																		<GetAppIcon />
																	</IconButton>
																	/* </Tooltip> */
																)}
																{/* <DeleteIcon onClick={() => handleDelete(row.id)} /> Delete feature was hided as discussed with preet on 06/03/2021 */}
															</TableCell>
														);
													}
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format ? column.format(value) : value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</Spinner>
					</Scrollbars>
				)}
				<Form open={open} loading={detailLoading} saveLoading={loading} handleClose={handleClose} />
				<Archive
					open={isArchiveModalShow}
					loading={loading}
					handleClose={handleArchiveModalClose}
					handleJobArchived={() => handleJobArchived()}
				/>
			</Paper>
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
		</>
	);
};
export default JobList;
