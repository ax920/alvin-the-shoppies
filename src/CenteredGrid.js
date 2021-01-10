import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Nominations from './Nominations';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  },
  addIcon: {
    fill: 'green'
  }
}));

export default function CenteredGrid() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [nominees, setNominees] = useState(JSON.parse(localStorage.getItem('nominees')) || []);
  const [addedMovieSnackbar, setAddedMovieSnackbar] = useState(false);
  const [exceedsMaxDialogOpen, setExceedsMaxDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nominees', JSON.stringify(nominees));
  });

  const handleChange = (newNominees) => {
    setNominees([...newNominees]);
    // https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render
    // LOL
    // Must spread the array so that React recognizes the new array as a state change and therefore re-renders
    // Otherwise it's the same array reference, so it thinks there's no reason to render
  }

  const getMovies = () => {
    fetch("http://www.omdbapi.com/?apikey=23d52167&s=" + searchTitle)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.Search);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  const classes = useStyles();

  const keyDown = (event) => {
    if (event.keyCode === 13) {
      setIsLoaded(false);
      setHasSearched(true);
      getMovies();
    }
  };

  const handleTextFieldChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const onAddMovie = (tile) => {
    if (nominees.some(movie => movie.imdbID === tile.imdbID)) {
      return;
    }
    if (nominees.length === 5) {
      handleExceedsDialogOpen();
      return;
    }
    setNominees([...nominees, tile]);
    setAddedMovieSnackbar(true);
  };

  const handleAddMovieSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAddedMovieSnackbar(false);
  };

  const handleExceedsDialogOpen = () => {
    setExceedsMaxDialogOpen(true);
  };

  const handleExceedsDialogClose = () => {
    setExceedsMaxDialogOpen(false);
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
                            <AddCircleOutlineIcon color={nominees.map(nominee => nominee.imdbID).includes(tile.imdbID) ? 'disabled' : 'primary'} className="classes.addIcon"></AddCircleOutlineIcon>
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
          <Nominations nominees={nominees} onChange={handleChange}></Nominations>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={addedMovieSnackbar}
          autoHideDuration={3000}
          onClose={handleAddMovieSnackbarClose}
          message="Added to nominees"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleAddMovieSnackbarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <Dialog
          open={exceedsMaxDialogOpen}
          onClose={handleExceedsDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Relaxxxx dude only 5 Shoppies are allowed"}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleExceedsDialogClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
