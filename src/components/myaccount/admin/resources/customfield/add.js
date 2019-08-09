import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Button, Divider, Form, Radio } from 'semantic-ui-react';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


let AddCustomField =(props)=>{

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [values, setValues] = React.useState({
      name: 'Controlled',
      typea: 'bool',
      mandatory: false,
      typeb: 'long',
      typec: 'date',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
    return(
        <div>
            <Button className={props.btncls} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Add Custom Field
                  </Typography>
                  <Button color="inherit" onClick={handleClose}>
                    save
                  </Button>
                </Toolbar>
              </AppBar>
              <div className='container'>
              <Form size='small' key='small'>
                <Divider hidden />
                <form class="ui form">
                <div class="field">
                  <label>Name</label>
                  <input placeholder="Name" onChange={handleChange('name')}/>
                  <Divider hidden />
                  <label>Type</label>
                
                <div className='container'>
                  <div className='row'>
                      <div class="field">
                        <div class="ui radio checkbox">
                        <input type="radio" class="" name="radioGroup" readonly="" tabindex="0" value="bool" onClick={handleChange('typea')}/>
                          <label>Yes/No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox">
                          <input type="radio" class="" name="radioGroup" readonly="" tabindex="0" value="decimal" onClick={handleChange('typea')}/>
                          <label>Decimal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox">
                          <input type="radio" class="" name="radioGroup" readonly="" tabindex="0" value="wholenumber" onClick={handleChange('typea')}/>
                          <label>Whole Number</label>
                        </div>
                    </div>
                </div>
                <Divider hidden />
                <div className='row'>
                      <div class="field">
                        <div class="ui radio checkbox">
                        <input type="radio" class="" name="radioGroup1" readonly="" tabindex="0" value="text" onClick={handleChange('typeb')}/>
                          <label>Text&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox">
                          <input type="radio" class="" name="radioGroup1" readonly="" tabindex="0" value="long" onClick={handleChange('typeb')}/>
                          <label>Long Text&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox">
                          <input type="radio" class="" name="radioGroup1" readonly="" tabindex="0" value="link" onClick={handleChange('typeb')}/>
                          <label>Link</label>
                        </div>
                    </div>
                </div>
                <Divider hidden />
                <div className='row'>
                      <div class="field">
                        <div class="ui radio checkbox">
                        <input type="radio" class="" name="radioGroup2" readonly="" tabindex="0" value="date" onClick={handleChange('typec')}/>
                          <label>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox">
                          <input type="radio" class="" name="radioGroup2" readonly="" tabindex="0" value="time" onClick={handleChange('typec')}/>
                          <label>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                    </div>
                </div>
                </div>
                <Divider hidden />
                <div class="field">
                  <div class="ui checkbox">
                    <input type="checkbox" class="" readonly="" tabindex="0" value='true' onChange={handleChange('mandatory')}/>
                    <label>Mandatory</label>
                  </div>
                </div>
                </div>
              </form>
                <Divider hidden />
              </Form>          
              </div>   
            </Dialog>
                
      </div>
    )
}

export default AddCustomField;