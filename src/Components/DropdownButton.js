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

    const exampleLabel = 'My Games'
    const exampleDropItems = [
        {text: 'Current', link: '/current'},
        {text: 'Past', link: '/past'}
    ]

    return(
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={label}/>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {dropItems.map((item, i) => (
                        <Link to={item.link} key={i} style={{textDecoration: 'none'}} >
                            <ListItem button key={i}>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Collapse>

        </List>
    )

}