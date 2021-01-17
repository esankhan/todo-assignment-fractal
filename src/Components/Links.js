import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  linkStyling: {
    textDecoration: "none",
    marginRight: "20px",
  },
}));
const Links = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Typography className={classes.root}>
      <Link href="#" onClick={preventDefault}>
        <RouterLink
          to="/"
          className={classes.linkStyling}
          style={{ marginLeft: "30%" }}
        >
          {" "}
          Home{" "}
        </RouterLink>
      </Link>
      <Link href="#" onClick={preventDefault}>
        <RouterLink to="/lists" className={classes.linkStyling}>
          {" "}
          Lists{" "}
        </RouterLink>
      </Link>
      <Link href="#" onClick={preventDefault}>
        About
      </Link>
    </Typography>
  );
};

export default Links;
