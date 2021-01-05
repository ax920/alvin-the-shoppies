import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginLeft: 100,
        // marginRight: 100
    },
    typography: {
        padding: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
    card: {
        minWidth: 800,
        minHeight: 150
    }
}));

export default function SimplePopover() {
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
                        <p>helloooo</p>
                        <h1>helloo2</h1>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card>
            </Popover>
        </div>
    );
}
