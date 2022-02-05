import { Step, StepConnector, StepLabel, Stepper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Check from "@material-ui/icons/Check";
import clsx from "clsx";
import React from "react";
import { companyApplicationStatuses } from "../../../utils/appConstants";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    // left: "calc(-50% + 8px)",
    // right: "calc(50% + 8px)",
    textTransform: "uppercase",
    color: "#ff0990",
  },
  active: {
    "& $line": {
      borderColor: "#ff0990",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#ff0990",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#ff0990",
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveCircle: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  completed: {
    color: "#fff",
    backgroundColor: "#ff0990",
    padding: 4,
    borderRadius: "50%",
    zIndex: 1,
    fontSize: 18,
  },
});

const useLabelStyles = makeStyles({
  root: {
    "& .MuiStepLabel-label": {
      textTransform: "uppercase",
      marginTop: 8,
      fontWeight: 600,
    },
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      color: "#ff0990 !important",
    },
    "& .MuiStepLabel-label.MuiStepLabel-completed": {
      color: "#ff0990 !important",
    },
  },
});

function QontoStepIcon(props: any) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : active ? (
        <div className={classes.circle}>
          <div className={classes.innerCircle} />
        </div>
      ) : (
        <div className={classes.inactiveCircle} />
      )}
    </div>
  );
}

const TrackJobStepper = ({ applicationStatus }: any) => {
  const labelClasses = useLabelStyles();
  return (
    <Stepper alternativeLabel activeStep={applicationStatus - 1} connector={<QontoConnector />}>
      {Object.values(companyApplicationStatuses).map((value) => (
        <Step key={value.id}>
          <StepLabel className={labelClasses.root} StepIconComponent={QontoStepIcon}>
            {value.title}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default TrackJobStepper;
