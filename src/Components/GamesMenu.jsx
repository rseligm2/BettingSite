import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { nanoid } from 'nanoid';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        width: '100%',
        margin: 'auto',
        maxHeight: '80',
        height: '10%'
    },
    button: {
        margin: theme.spacing(1, 0),
        color: "#292A5F",
    },
    activeUrl:{
        backgroundColor: '#eeeeee'
    }
}))

export default function GamesMenu(props){

    const classes = useStyles();
    const games = ['NFL', 'NBA', 'NHL', 'MLB', 'NCAAF', 'NCAAB']

    let { path, url } = useRouteMatch();

    return(
        <Paper variant="outlined" className={classes.root}>
            {games.map((item) => (
                <NavLink to={`${url}/${item.toLowerCase()}`} key={nanoid()} style={{textDecoration: 'none'}} activeClassName={classes.activeUrl}>
                    <ListItem button>
                        <ListItemText style={{color: 'black'}}>{item}</ListItemText>
                    </ListItem>
                </NavLink>
            ))}
        </Paper>
    )
}