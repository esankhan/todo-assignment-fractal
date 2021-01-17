import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBucketThunk,
  addTaskThunk,
  unsetError,
} from "../redux-files/List/list-actions";
import {
  getAllBuckets,
  getIsError,
  getErrorText,
} from "../redux-files/List/selectors";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  //other
  const noOfBuckets = useSelector((state) => getAllBuckets(state));
  const isError = useSelector((state) => getIsError(state));
  const errorText = useSelector((state) => getErrorText(state));
  const dispatch = useDispatch();
  const classes = useStyles();

  // setting up state
  const [isTask, setIsTask] = useState(true);
  const [value, setValue] = useState(noOfBuckets[0].bucketName);
  const [taskText, setTaskText] = useState("");
  const [bucketText, setBucketText] = useState("");

  //handle Change Event
  const handleChange = (event) => {
    if (event.target.name === "TaskInput") {
      setTaskText(event.target.value);
    } else if (event.target.name === "bucketSelect") {
      setValue(event.target.value);
    } else if (event.target.name === "BucketInput") {
      setBucketText(event.target.value);
    }
  };

  //methods
  const addNewBucket = () => {
    dispatch(addBucketThunk(bucketText));
    setBucketText("");
  };

  const addNewTask = () => {
    dispatch(addTaskThunk({ taskText, value }));
    setTaskText("");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>To-Do List</Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "40%" }}
          disabled={noOfBuckets.length < 1}
          onClick={() => setIsTask(true)}
        >
          {"Add Tasks   "}
          {"  "}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "40%", marginTop: "15px" }}
          onClick={() => setIsTask(false)}
        >
          {"Create Bucket"}
        </Button>
      </Grid>
      {isTask && (
        <Grid item xs={12}>
          <form noValidate autoComplete="off" style={{ textAlign: "center" }}>
            <TextField
              name="TaskInput"
              id="outlined-basic"
              label="Enter Task"
              variant="outlined"
              value={taskText}
              onChange={handleChange}
            />
          </form>
          {noOfBuckets.length > 0 && (
            <FormControl
              component="fieldset"
              style={{ marginLeft: "32%", marginTop: "20px" }}
            >
              <FormLabel component="legend">Existing Buckets</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="bucketSelect"
                value={value}
                onChange={handleChange}
              >
                {noOfBuckets.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.bucketName}
                    control={<Radio />}
                    label={item.bucketName}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          {noOfBuckets.length === 0 && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Please Add Buckets to Add Tasks
              </Paper>
            </Grid>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "40%" }}
            disabled={noOfBuckets.length > 0 && taskText.length < 4}
            onClick={addNewTask}
          >
            {"Add Task   "}
            {"  "}
          </Button>
        </Grid>
      )}
      {!isTask && (
        <Grid item xs={12}>
          <form noValidate autoComplete="off" style={{ textAlign: "center" }}>
            <TextField
              name="BucketInput"
              id="outlined-basic"
              label="Enter Bucket"
              variant="outlined"
              value={bucketText}
              onChange={handleChange}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "40%", marginTop: "10px" }}
            disabled={bucketText.length < 4}
            onClick={addNewBucket}
          >
            Add Bucket
          </Button>
          {isError && (
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ color: "red", marginTop: "15px" }}
              >
                {errorText}
                <CloseIcon
                  onClick={() => dispatch(unsetError())}
                  style={{ cursor: "pointer", marginLeft: "50%" }}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
