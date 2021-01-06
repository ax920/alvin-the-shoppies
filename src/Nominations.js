import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginLeft: 100,
        // marginRight: 100
    },
    typography: {
        padding: theme.spacing(2),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
    card: {
        minWidth: 800,
        minHeight: 150,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '50%',
        maxHeight: '50%',
    },
    movieTitle: {
        margin: -5,
        textAlign: 'center',
    },
    movieYear: {
        textAlign: 'center',
    },
    removeButton: {
        marginTop: -10,
        margin: 'auto',
    },
    removeIcon: {
        fill: 'red'
    }
}));

export default function SimplePopover(props) {
    console.log(props)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            <Fab onClick={handleClick} color="secondary" aria-label="add" className={classes.fab}>
                <MenuIcon />
            </Fab>
            <Popover
                className={classes.card}
                id={id}
                open={open}
                anchorReference="anchorPosition"
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorPosition={{
                    left: '100',
                    top: '800'

                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Card
                    className={classes.card}
                    variant="outlined">
                    <CardContent>
                        <Grid container spacing={2}>
                            {props.nominees.map((tile) => (
                                <Grid item xs={3}>
                                    <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
                                        <Grid item>
                                            <img className={classes.img} alt="complex" src={tile.Poster} />
                                        </Grid>
                                        <IconButton className={classes.removeButton} aria-label="add" size="small">
                                            <RemoveCircleOutlineIcon className={classes.removeIcon} ></RemoveCircleOutlineIcon>
                                        </IconButton>
                                        <Grid item xs>
                                            <Typography className={classes.movieTitle} gutterBottom variant="subtitle1">
                                                {tile.Title}
                                            </Typography>
                                            <Typography className={classes.movieYear} variant="body2" color="textSecondary">
                                                {tile.Year}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </div>
    );
}
