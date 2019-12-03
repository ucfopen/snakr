import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Restock from "./Restock";
import Additem from "./Additem";

const drawerWidth = 170;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

function Admin() {
  const [currPage, setCurrPage] = useState("Restock");
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <div className="admin">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {["Restock", "New Item", "Bank"].map((text, index) => (
            <ListItem button key={text} onClick={() => setCurrPage(text)}>
              <ListItemIcon>
                {(() => {
                  switch (index) {
                    case 0:
                      return <ShoppingCartIcon />;
                    case 1:
                      return <AddShoppingCart />;
                    case 2:
                      return <AccountBalanceIcon />;
                    default:
                      return <ShoppingCartIcon />;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {(() => {
        switch (currPage) {
          case "Restock":
            return <Restock directTo={page => setCurrPage(page)} />;
          case "New Item":
            return <Additem directTo={page => setCurrPage(page)} />;
          case "Bank":
            return null;
          default:
            return null;
        }
      })()}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Restock"
          icon={<ShoppingCartIcon />}
          onClick={() => setCurrPage("Restock")}
        />
        <BottomNavigationAction
          label="New Item"
          icon={<AddShoppingCart />}
          onClick={() => setCurrPage("NewItem")}
        />
        <BottomNavigationAction
          label="Bank"
          icon={<AccountBalanceIcon />}
          onClick={() => setCurrPage("Bank")}
        />
      </BottomNavigation>
    </div>
  );
}

export default Admin;

// , {useContext,useEffect,useState}
