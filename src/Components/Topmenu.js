import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DropdownButton from './DropdownButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        width: '100%',
        margin: 'auto',
        maxHeight: '100',
        height: '10%'
    },
    button: {
        margin: theme.spacing(1, 0),
        color: "#292A5F",
    },
}))

export default function Topmenu(props){

    const classes = useStyles();
    const sports = ['Football', 'Basketball', 'Hockey', 'Baseball', 'Soccer']
    const menuItems = props.menuItems //pass in array of buttons to go in menu

    const example = [
        {label: 'My Games', dropItems: [{text: 'Current', link: '/current'}, {text: 'Past', link: '/past'}]},
        {label: 'Experts', dropItems: [{text: 'My Experts', link: '/myexperts'}, {text: 'Find Experts', link: '/findexperts'}]}
    ]

    const profileDrop = [{text: 'Settings', link: '/profile/settings'},
                         {text: 'Logout', link: '/logout'}]

    // const user = useSelector(selectUser)
    const user = JSON.parse(localStorage.getItem("user"));

    const exampleMenuItems = []



    return(
        <Paper variant="outlined" className={classes.root}>
            {menuItems.map((item, i) => (
                <DropdownButton label={item.label} dropItems={item.dropItems} key={i} />
            ))}
            <DropdownButton label={user.username} dropItems={profileDrop} isProfile={true}/>
        </Paper>
    )
}
