import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(1, 0),
        color: "#292A5F",
    },
}))

export default function Topmenu(){

    const classes = useStyles();
    const sports = ['Football', 'Basketball', 'Hockey', 'Baseball', 'Soccer']

    return(
        <Paper variant="outlined" className={classes.root}>
            {sports.map((sport, i) => (
                <Button
                    key={i}
                >
                    {sport}
                </Button>
            ))}
        </Paper>
    )
}
