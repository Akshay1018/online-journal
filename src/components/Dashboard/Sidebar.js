import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import {
    AppBar,
    CssBaseline,
    List,
    Toolbar,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button,
    
} from '@material-ui/core';
import { AddBox, ExitToApp, MenuBook, Delete, Search } from '@material-ui/icons';
import Main from './Main';
import SearchResults from 'react-filter-search';
//context
import JournalContext from '../../context/journal/JournalContext.js';
import Loading from '../Loading.js';
import Instructions from './Instructions.js'
const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    setActive: {
        backgroundColor: 'rgba(144, 103, 166,0.5)',
        hover: 'none'
    },
    grow: {
        flexGrow: 1
    }
}));
function Sidebar() {
    const journalContext = useContext(JournalContext);
    const {
        journals,
        setJournals,
        deleteJournal,
        activeJournal,
        setActiveJournal,
        addJournal,
        loading
    } = journalContext;
    const [data, setData] = useState({
        title: 'Untitled Journal',
        journalbody: "this is body.."
    });
    const [open, setOpen] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {

        setJournals();
        // eslint-disable-next-line
    }, []);
    const onSearch = (event) => {
        setSearchValue(event.target.value);
    }
    const classes = useStyles();
    const onAddEntry = () => {
     
        const { title, journalbody } = data;
      
        addJournal(title, journalbody);

    }
    const onEditEntry = (id) => {
        setActiveJournal(id);
    }
    const onclick = () => {
        if (localStorage.token) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar flex='space-between'>
                    <Typography variant='h6' >
                        Welcome To Dashboard!
                    </Typography>
                    <div className={classes.grow} />
                    <Button onClick={handleClickOpen} color='inherit'>
                        Instructions
                    </Button>
                </Toolbar>
            </AppBar>
            {loading && <Loading />}
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper
                }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem
                            button
                            // component={Link} to='/'
                            onClick={onAddEntry}>
                            <ListItemIcon><AddBox /></ListItemIcon>
                            <ListItemText primary='Add Entry' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemIcon><Search /></ListItemIcon>
                            <TextField placeholder='Search Journals'
                                onChange={onSearch}
                                fullWidth />
                        </ListItem>
                    </List>
                    <List>
                        <SearchResults
                            value={searchValue}
                            data={journals}
                            renderResults={journals => (
                                journals.map((journal) => (
                                    <ListItem button key={journal._id}
                                        onClick={() => onEditEntry(journal._id)}
                                        className={journal._id === activeJournal && classes.setActive}>
                                        <ListItemIcon><MenuBook /></ListItemIcon>
                                        <ListItemText
                                            primary={journal.title}
                                            secondary={
                                                journal.journalbody &&
                                                journal.journalbody.substr(0, 50) + "..."} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge='end' aria-label="delete" onClick={() => deleteJournal(journal._id)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            )} />
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={onclick}>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary='Log Out' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Main
                    activeJournal={activeJournal}
                    data={data}
                    setData={setData} />
            </main>
            <Instructions handleClose={handleClose} open={open} />
        </div>
    )
}
export default Sidebar;