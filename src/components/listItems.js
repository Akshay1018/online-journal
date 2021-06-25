import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/icons/List';
import Logout from '@material-ui/icons/ExitToApp';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Add new entry" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <List />
      </ListItemIcon>
      <ListItemText primary="All entries" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    
  </div>
);

