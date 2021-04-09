import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { LK_SITE_TITLE } from '../constants';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import BookOutlined from '@material-ui/icons/BookOutlined';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles
} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.modal + 1
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		},
		liActive: {
			background: '#f4f4f4'
		},
		siteTitle: {
			'& a': {
				color: '#ffffff',
				textDecoration: 'none'
			}
		}
	})
);

interface Props {}

const Nav: React.FC<Props> = () => {
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{
			text: 'My Books',
			icon: <BookOutlined />,
			path: '/'
		},
		{
			text: 'Add Book',
			icon: <AddCircleOutlined />,
			path: '/add'
		},
		{
			text: 'Add Author',
			icon: <PersonAddOutlined />,
			path: '/author/add'
		}
	];

	const drawer = (
		<>
			<div className={classes.toolbar} />
			<List>
				{menuItems.map((item) => (
					<div key={item.text}>
						<ListItem
							button
							className={
								location.pathname === item.path
									? classes.liActive
									: ''
							}
							onClick={() => history.push(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
		</>
	);

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Hidden smUp>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Typography
						variant="h6"
						noWrap
						className={classes.siteTitle}
					>
						<Link to="/">{LK_SITE_TITLE}</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="js">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</>
	);
};

export default Nav;
