import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AutoIcon from '@material-ui/icons/WbIridescent';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';
import icon1 from '..//..//..//..//images/icon-1.png'
import './listing.css';
// import logo_9 from '..//images/edit-button-1.png'
// import logo_10 from '..//images/map-button.png'
import EditButton from './edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

// Add Headers of Table here-----------------------------------------------
const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'icons', numeric: true, disablePadding: false, label: 'Icons' },
    { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const classesofTableHead = tableHeadstyles();

  return (
    <TableHead>
      <TableRow>
       {/*  <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all employees' }}
          />
        </TableCell> */}
        {headRows.map(row => (
          <TableCell
            key={row.id}
            // align={row.numeric ? 'right' : 'left'}
            align='left'
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
            className={classesofTableHead.root}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const tableHeadstyles = makeStyles({
    root: {
        background: '#F4662F',
        color: 'white',
        fontWeight: 'bolder',
    },
  });

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          {/* <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
        ) : (
          {/* <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    maxWidth: 600,
  },
  table: {
    minWidth: 100,
    maxWidth: 600,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

        const classesOfPopUseStyle = makeStyles(theme => ({
            typography: {
              padding: theme.spacing(1),
              fontSize: '12px',
            },
            icon:{
                margin: 'auto',
                alignContent: 'center',
            },
          }));
          
            
          const GriduseStyles = makeStyles(theme => ({
            root: {
              flexGrow: 1,
              overflow: 'hidden',
              padding: theme.spacing(0),
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'space-around',
            },
            paper: {
              padding: theme.spacing(1),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
          }));
            
let ContactsGroupListingTable=(props)=> {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Registration');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function createData(name, icon) {
    return { name, icon };
  }
  const rows = [
    createData('Cupcake', icon1),
    createData('Dek', icon1),
    createData('Luck', icon1),
];
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

//   function handleSelectAllClick(event) {
//     if (event.target.checked) {
//       const newSelecteds = rows.map(n => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classesOfPop = classesOfPopUseStyle();

  

            // const [anchorEl, setAnchorEl] = React.useState(null);

            // function handleClickpop(event) {
            //     setAnchorEl(anchorEl ? null : event.currentTarget);
            // }

            // const open = Boolean(anchorEl);
            // const id = open ? 'simple-popper' : undefined;
            

            const StyledMenu = withStyles({
              paper: {
                border: '1px solid #d3d4d5',
              },
            })(props => (
              <Menu
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                {...props}
              />
            ));
            const StyledMenuItem = withStyles(theme => ({
              root: {
                '&:focus': {
                  backgroundColor: theme.palette.primary.main,
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                  },
                },
              },
            }))(MenuItem);
            
                     
            const [anchormenuEl, setAnchormenuEl] = React.useState(null);

            function handleMenuClick(event) {
              setAnchormenuEl(event.currentTarget);
            }

            function handleMenuClose() {
              setAnchormenuEl(null);
            }

    let [Editstate, setEditstate] = React.useState(false);
    let HandleEditforlisting=()=>{
        return(
            setEditstate(Editstate= !Editstate),
            handleMenuClose()
        )
    }

    let HandleCrossEditforlisting=()=>{
        return(
            setEditstate(Editstate= false)
        )
    }
    
    let EditshowModel='';
    if(Editstate){
        EditshowModel=<EditButton click={Editstate} cross={HandleCrossEditforlisting}/>
    }
    else{
        EditshowModel='';
    }

  return (
      
    <div className={classes.root}>
        {EditshowModel}
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
            //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                   const isItemSelected = isSelected(row.name);
                   const labelId = `enhanced-table-checkbox-${index}`;
                    
                  return (
                    
                    <TableRow
                      hover
                      // onClick={handleClickpop}
                     /*  onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected} */
                    >
                    <TableCell align="left" 
                    // onClick={handleClickpop}
                    > 
                      {row.name}</TableCell>

                    <TableCell align="left" 
                    // onClick={handleClickpop}
                    ><img src={row.icon}/></TableCell>

                    <TableCell align="left" 
                    // onClick={handleMenuClick}
                    >
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    </TableCell>
                    <StyledMenu
                            id="customized-menu"
                            anchorEl={anchormenuEl}
                            keepMounted
                            open={Boolean(anchormenuEl)}
                            onClose={handleMenuClose}
                          >
                            <StyledMenuItem>
                              <ListItemIcon>
                                <AutoIcon />
                              </ListItemIcon>
                              <ListItemText primary="Auto Ref." />
                            </StyledMenuItem>
                            <StyledMenuItem>
                              <ListItemIcon>
                                <CancelIcon />
                              </ListItemIcon>
                              <ListItemText primary="Empty Group" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={HandleEditforlisting}>
                              <ListItemIcon>
                                <EditIcon />
                              </ListItemIcon>
                              <ListItemText primary="Edit" />
                            </StyledMenuItem>
                            <StyledMenuItem>
                              <ListItemIcon>
                                <DeleteIcon />
                              </ListItemIcon>
                              <ListItemText primary="Delete" />
                            </StyledMenuItem>
                          </StyledMenu>

                    {/* <Popper
                        placement="top"
                        disablePortal={false}
                        modifiers={{
                            flip: {
                            enabled: false,
                            },
                            preventOverflow: {
                            enabled: true,
                            boundariesElement: 'scrollParent',
                            },
                            arrow: {
                            enabled: true,
                            element: 'arrowRef',
                            },
                        }}
                        open={open} 
                        anchorEl={anchorEl} 
                        transition
                        >
                            {/* <div className='container pop'>
                                <div className='row pop'>
                                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                        <div className='row icon'><AutoIcon className={classesOfPop.icon} /></div>
                                        <div className='row icon'><p>Automatic Reference</p></div>
                                    </div>
                                    <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                                        <div className='row icon'><CancelIcon className={classesOfPop.icon} /></div>
                                        <div className='row icon em'><p>Empty Group</p></div>
                                    </div>
                                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2' onClick={HandleEditforlisting}>
                                        <div className='row icon'><EditIcon className={classesOfPop.icon} /></div>
                                        <div className='row icon'><p >Edit</p></div>
                                    </div>
                                    <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                                        <div className='row icon'><DeleteIcon className={classesOfPop.icon} /></div>
                                        <div className='row icon'><p>Delete</p></div>
                                    </div>
                                    
                                </div>
                            </div>
                    </Popper> */}
                      
                    </TableRow>
                    
                    
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default ContactsGroupListingTable;
