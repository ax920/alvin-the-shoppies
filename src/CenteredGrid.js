import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Nominations from './Nominations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: "100%",
  },
  searchContainer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(0.5),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  searchBar: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  movieContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(50),
    color: theme.palette.text.secondary,
    width: "100%"
  },
  imageContainer: {
    position: 'relative'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '60%',
    maxHeight: '60%',
  },
  movieTitle: {
    marginTop: -10,
    marginBottom: -5
  },
  resultText: {
    paddingLeft: 30,
    paddingTop: 10
  }
}));

export default function CenteredGrid() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [nominees, setNominees] = useState([]);

  const getMovies = () => {
    fetch("http://www.omdbapi.com/?apikey=23d52167&s=" + searchTitle)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result.Search)
          setIsLoaded(true);
          setItems(result.Search);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  const classes = useStyles();

  const keyDown = (event) => {
    if (event.keyCode == 13) {
      setIsLoaded(false);
      setHasSearched(true);
      // console.log('value', event.target.value);
      getMovies();
    }
  };

  const handleTextFieldChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const onAddMovie = (tile) => {
    setNominees([...nominees, tile]);
    console.log(nominees);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.searchContainer}>
              <h3>The Shoppies 2021</h3>
              <form className={classes.root} onSubmit={e => { e.preventDefault(); }} noValidate autoComplete="on">
                <TextField className={classes.searchBar} id="outlined-basic" onKeyDown={keyDown} onChange={handleTextFieldChange} label="Search for your favourite movies!" variant="outlined" />
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.movieContainer}>
              {(() => {
                if (!hasSearched) {
                  return <Grid container spacing={2}>
                    <Typography className={classes.resultText} gutterBottom variant="subtitle1">
                      Your searches will appear here!
                    </Typography>
                  </Grid>
                } else if (!items) {
                  return <Grid container spacing={2}>
                    <Typography className={classes.resultText} gutterBottom variant="subtitle1">
                      There were no matches :(
                  </Typography>
                  </Grid>
                }
                return <Grid container spacing={2}>
                  {items.map((tile) => (
                    <Grid item xs={3}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <img className={classes.img} alt="complex" src={tile.Poster} />
                          <IconButton aria-label="add" onClick={() => onAddMovie(tile)} size="small">
                            <AddCircleOutlineIcon className=""></AddCircleOutlineIcon>
                          </IconButton>
                        </Grid>
                        <Grid item xs>
                          <Typography className={classes.movieTitle} gutterBottom variant="subtitle1">
                            {tile.Title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {tile.Year}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              })()
              }
            </Paper>
          </Grid>
          <Nominations nominees={nominees}></Nominations>
        </Grid>
      </div>
    );
  }
}
