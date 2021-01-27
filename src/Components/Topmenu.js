import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DropdownButton from './DropdownButton';
import {Link} from 'react-router-dom';


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
    const menuItems = props.menuItems //pass in array of buttons to go in menu

    const example = [
        {label: 'My Games', dropItems: [{text: 'Current', link: '/current'}, {text: 'Past', link: '/past'}]},
        {label: 'Experts', dropItems: [{text: 'My Experts', link: '/myexperts'}, {text: 'Find Experts', link: '/findexperts'}]}
    ]

    const profileDrop = [{text: 'Settings', link: '/profile/settings'},
                         {text: 'Logout', link: '/logout'}]

    // const user = useSelector(selectUser)
    const user = JSON.parse(localStorage.getItem("user"));

    return(
        <Paper variant="outlined" className={classes.root}>
            <Link to={'/'} style={{textDecoration: 'none'}} >
                <div style={{postion: 'relative', paddingLeft: '1em', paddingRight: '1em'}}>
                    <h3 style={{color: 'black'}} >Bettor Market</h3>
                </div>
            </Link>
            {menuItems.map((item, i) => (
                <DropdownButton label={item.label} dropItems={item.dropItems} key={i} />
            ))}
            <DropdownButton label={user.username} dropItems={profileDrop} isProfile={true}/>
        </Paper>
    )
}
