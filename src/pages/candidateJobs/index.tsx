import * as React from "react";
import JobGrid from "./jobGrid";
import { Grid, TextField, InputAdornment } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import Button from '../../components/common/Button';


const jobLists = () => (
    <div className="job-lists-container">
        <Grid container className="job-lists-header">
            <Grid item xs={10}>
                <TextField
                    id="outlined-basic"
                    placeholder="Search by keywords, e.g., software engineer, Seattle, employHER Inc."
                    variant="outlined"
                    className="job-list-searchBox"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon className="job-lists-searchBoxIcon" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={2} className="my-job-btn-container">
                <Button className="my-job-hub-btn">My Job Hub</Button>
            </Grid>
        </Grid>
        <Grid container className="job-grid-container">
            <Grid className="filter-btn-container" item xs={2} >
                <Button className="filter-btn1" >Relevant</Button>
                <Button className="filter-btn2" >Recent</Button>
            </Grid>
            <Grid className="filter-btn-container" item xs={5} >
                <Button className="filter-btn1" >This week</Button>
                <Button className="filter-btn2" >This month</Button>
                <Button className="filter-btn2" >Anytime</Button>
                Custom
            </Grid>
            <Grid className="filter-btn-container" item xs={5} >
                <Button className="filter-btn1" >Full-time</Button>
                <Button className="filter-btn2" >Part-time</Button>
                <Button className="filter-btn2" >Contract</Button>
                <Button className="filter-btn2" >Internship</Button>
            </Grid>
        </Grid>
        <Grid container className="job-grid-container">
            <JobGrid />
        </Grid>
        <Grid container className="pagination-container" >
            <Pagination count={10} variant="outlined" color="secondary" />
        </Grid>
    </div>
);
export default jobLists;