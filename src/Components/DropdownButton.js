import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

export default function DropdownButton(props){
    const [open, setOpen] = React.useState(false)

    const handleClick = () =>{
        setOpen(!open)
    }

    const label = props.label //text for item label
    const dropItems = props.dropItems //array with text and links for dropdown menu

    const isProfile = props.isProfile ? props.isProfile : false

    return(
        <div style={isProfile ? {marginLeft: 'auto'} : {position: 'relative'}}>
            <List onMouseEnter={handleClick} onMouseLeave={handleClick} style={{position: 'relative'}}>
                <ListItem button>
                    <ListItemText primary={label}/>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit style={{position: 'absolute', display: 'block', backgroundColor: 'white', width: '100%', zIndex: '5'}}>
                    <List component="div" disablePadding>
                        {dropItems.map((item, i) => (
                            <Link to={item.link} key={i} style={{textDecoration: 'none'}} >
                                <ListItem button key={i}>
                                    <ListItemText primary={item.text} style={{color: 'black'}}/>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Collapse>
            </List>
        </div>
    )

}