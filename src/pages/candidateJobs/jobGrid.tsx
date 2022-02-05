import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import MicrosoftIcon from '../../assets/images/microsoft.png';
import data from './sampleData';
import Modal from '../../components/common/Modal';

const JobGrid = () => {

  const [open, setOpen] = React.useState(false);

  const getJobBasicInfo = (job) => {
    return (
      <div className="job-basic-info">
        <Grid xs={10} item>
          <h4 className="job-title">{job.title || ""}</h4>
          <p className="company-name">{job.company_name || ""}</p>
          <p className="job-location">{job.location || ""}</p>
        </Grid>
        <Grid xs={2} item className="microsoft-logo-wrapper">
          <img src={MicrosoftIcon} className="microsoft-logo" />
        </Grid>
      </div>
    )
  }

  const getCards = () => {
    const cards = data.map((s) => {
      return (
        <Grid xs={4} key={s.id || ""} item>
          <Paper className="job-card-wrapper" onClick={handleCardClick}>
            <div className="job-card">
              {getJobBasicInfo(s)}
              <div className="job-other-info">
                <Typography variant="body2" color="textSecondary" className="job-description">
                  {s.description || ""}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="job-posted-date">
                  posted on {s.date_published || ""}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      )
    });
    return cards;
  }

  const handleCardClick = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const d = {
    title: "Software Engineer",
    company_name: "Microsoft",
    location: "Redmond, WA, USA"
  }
  return (
    <>
      <Scrollbars
        renderThumbHorizontal={() => <div />}
        renderView={({ children }) => (
          <div className="job-grid-container">{children}</div>
        )}
        className="job-grid-scroller">
        <Grid container className="job-grid-wrapper" spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {getCards()}
            </Grid>
          </Grid>
        </Grid>
      </Scrollbars>
      <Modal visible={open} size="x-large" closeButton={true} onClose={handleClose}>
        <div className="job-detail">
          {getJobBasicInfo(d)}
          <h4>Description</h4>
          <Typography gutterBottom className="job-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien elit faucibus bibendum proin ut. Arcu viverra mollis dolor neque imperdiet sit velit. Pellentesque tempus, etiam laoreet id euismod. Penatibus vulputate magnis suspendisse posuere a sed sagittis.
          </Typography>
          <h4>Basic Qualification</h4>
          <Typography gutterBottom className="job-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien elit faucibus bibendum proin ut. Arcu viverra mollis dolor neque imperdiet sit velit. Pellentesque tempus, etiam laoreet id euismod. Penatibus vulputate magnis suspendisse posuere a sed sagittis.
          </Typography>
          <h4>Preferred Qualification</h4>
          <Typography gutterBottom className="job-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien elit faucibus bibendum proin ut. Arcu viverra mollis dolor neque imperdiet sit velit. Pellentesque tempus, etiam laoreet id euismod. Penatibus vulputate magnis suspendisse posuere a sed sagittis.
          </Typography>
        </div>
      </Modal>
    </>
  );
}
export default JobGrid;
