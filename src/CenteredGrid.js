import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Nominations from './Nominations';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchContainer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(0.5),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  movieContainer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(55),
    color: theme.palette.text.secondary,
  },
  searchBar: {
    width: "100%",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.searchContainer}>
            <h3>The Shoppies 2021</h3>
            <form className={classes.root} noValidate autoComplete="on">
              <TextField className={classes.searchBar} id="outlined-basic" label="Search for your favourite movies!" variant="outlined" />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.movieContainer}></Paper>
        </Grid>
        <Nominations></Nominations>
      </Grid>
    </div>
  );
}
