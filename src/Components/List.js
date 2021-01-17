import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteBucketThunk,
  completeTaskThunk,
} from "../redux-files/List/list-actions";
import {
  getAllBuckets,
  getIsError,
  getErrorText,
} from "../redux-files/List/selectors";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: "10px",
  },
  rootlist: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Lists = () => {
  //other
  const noOfBuckets = useSelector((state) => getAllBuckets(state));
  const isError = useSelector((state) => getIsError(state));
  const errorText = useSelector((state) => getErrorText(state));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(noOfBuckets[0].bucketName);
  const [listItems, setListItems] = useState(noOfBuckets[0].list);
  const [isActiveTask, setIsActiveTask] = useState(true);
  //let listItems = [];
  console.log(noOfBuckets);
  //handle Change Event
  const handleChange = (event) => {
    setValue(event.target.value);
    let bucket = noOfBuckets.find(
      (item) => item.bucketName === event.target.value
    );
    // listItems = bucket.list;
    setListItems(bucket.list);
  };

  const deleteBucket = (index, bucketName) => {
    setValue(noOfBuckets[index - 1].bucketName);
    dispatch(DeleteBucketThunk(bucketName));
    setListItems(noOfBuckets[index - 1].list);
  };

  const changeTaskStatus = (title) => {
    console.log(title);
    dispatch(completeTaskThunk({ title, value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>To-Do List</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Buckets</Paper>
        <FormControl
          component="fieldset"
          style={{ marginLeft: "45%", marginTop: "20px" }}
        >
          <FormLabel component="legend">Buckets</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="bucketSelect"
            value={value}
            onChange={handleChange}
          >
            {noOfBuckets.map((item, index) => (
              <span>
                <FormControlLabel
                  key={index}
                  value={item.bucketName}
                  control={<Radio />}
                  label={item.bucketName}
                />
                {item.bucketName !== "General" && (
                  <>
                    <CloseIcon
                      onClick={() => deleteBucket(index, item.bucketName)}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                )}
              </span>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Tasks in the bucket</Paper>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "45%", marginTop: "20px" }}
            disabled={noOfBuckets.length < 1}
            onClick={() => setIsActiveTask(true)}
          >
            {"Active Tasks   "}
            {"  "}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "45%", marginTop: "15px" }}
            onClick={() => setIsActiveTask(false)}
          >
            {"Inactive Tasks"}
          </Button>
        </Grid>
        {isActiveTask &&
          listItems.map(
            (item, index) =>
              item.isActive && (
                <div
                  key={index}
                  className={classes.rootlist}
                  style={{ marginTop: "20px", margintLeft: "30%" }}
                >
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    style={{ marginTop: "20px", margintLeft: "30%" }}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <DoneIcon
                          onClick={() => changeTaskStatus(item.listTitle)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.listTitle} />
                    </ListItem>
                  </List>
                </div>
              )
          )}
        {!isActiveTask &&
          listItems.map(
            (item, index) =>
              !item.isActive && (
                <div
                  key={index}
                  className={classes.rootlist}
                  style={{ marginTop: "20px", margintLeft: "30%" }}
                >
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    style={{ marginTop: "20px", margintLeft: "30%" }}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <RestoreIcon
                          onClick={() => changeTaskStatus(item.listTitle)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.listTitle} />
                    </ListItem>
                  </List>
                </div>
              )
          )}
      </Grid>
    </Grid>
  );
};
export default Lists;
