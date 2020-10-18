import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Sidemenu(){

    const [selectedIndex, setSelectedIndex] = React.useState("")

    const handleClick = index => {
        if (selectedIndex === index) {
          setSelectedIndex("")
        } else {
          setSelectedIndex(index)
        }
    }

    return(
        <List key={item.title}>
                <ListItem
                    key={item.title}
                    button
                    onClick={() => {
                    handleClick(index)
                    }}
                >
                    <ListItemText primary={item.title} />
                    {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {item.submenu.map((sub, i) => {
                        return (
                        <ListItem key = {sub.name}>
                            <Checkbox
                            checked={checkmarks[item.title][i]}
                            onChange={(e) => handleChange(e, item.title, i)}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            id = {sub.name}
                            key = {item.title + "_" + sub.name}
                            />
                            <ListItemText primary={sub.name} />
                        </ListItem>
                        )
                    })}
                    </List>
                </Collapse>
                </List>
    )
}