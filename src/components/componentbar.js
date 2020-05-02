import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const drawerWidth = 72;
const finalDrawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarShift: {
    marginLeft: 500,
    width: `calc(100% - ${finalDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ComponentBar(props) {
  const classes = useStyles();
  const {open, section} = props;

  return (
    <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <Typography
          position="absolute"
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          {section || 'Seccion desconocida'}
        </Typography>
        <IconButton
          color="inherit"
          component="a"
          href="https://github.com/ibejarano">
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="inherit"
          component="a"
          href="https://twitter.com/IgnacioBejara13">
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          component="a"
          href="https://instagram.com/nacho.bejarano">
          <InstagramIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
