/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.info.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
    formControl: {
      marginTop: theme.spacing(1),

      width: '100%',
    },
  },
}));

const TimingsForm = (props) => {
  const classes = useStyles();
  let start_time_init = '07:30';
  let end_time_init = '07:30';
  if (props.timing.start_time && props.timing.end_time) {
    let date = moment(props.timing.start_time);
    start_time_init = date.utc().format('hh:mm');
    date = moment(props.timing.end_time);
    end_time_init = date.utc().format('hh:mm');
  }

  const [formData, setFormData] = useState({
    _class: props.timing.class ? props.timing.class._id : '',
    day: props.timing.day && props.timing.day,
    start_time: props.timing.start_time ? start_time_init : '07:30',
    end_time: props.timing.end_time ? end_time_init : '07:30',
  });
  const { _class, day, start_time, end_time } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (_class == '' || day == '' || start_time == '' || end_time == '') {
      props.dispatch(setAlert('Invalid fields', 'warning'));
    } else {
      if (!props.timing) {
        const updatedItems = {};
        let date = moment(
          `2010-10-20 ${start_time} +0000`,
          'YYYY-MM-DD HH:mm Z'
        );
        start_time_init = date.format();
        date = moment(`2010-10-20 ${end_time} +0000`, 'YYYY-MM-DD HH:mm Z');
        end_time_init = date.format();

        updatedItems.class = _class;
        updatedItems.day = day;
        updatedItems.start_time = start_time_init;
        updatedItems.end_time = end_time_init;

        props.onSubmit(updatedItems);
      } else {
        const updatedItems = {};
        let date = moment(
          `2010-10-20 ${start_time} +0000`,
          'YYYY-MM-DD HH:mm Z'
        );
        start_time_init = date.format();
        date = moment(`2010-10-20 ${end_time} +0000`, 'YYYY-MM-DD HH:mm Z');
        end_time_init = date.format();
        updatedItems.class = _class;
        updatedItems.day = day;

        updatedItems.start_time = start_time_init;

        updatedItems.end_time = end_time_init;

        props.onSubmit(updatedItems);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {props.timing ? 'Edit timing' : 'Add timing'}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel id='demo-simple-select-filled-label'>
                  Class
                </InputLabel>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  value={_class}
                  onChange={onChange}
                  variant='outlined'
                  name={'_class'}
                  required
                >
                  <MenuItem
                    key={0}
                    value={
                      props.timing.class && props._classes
                        ? props._classes.filter(
                            (part) =>
                              (part && part._id) ==
                              (props.timing.class && props.timing.class._id)
                          )[0]._id
                        : ''
                    }
                  ></MenuItem>
                  {props._classes &&
                    props._classes.map((parClass) => (
                      <MenuItem value={parClass._id} key={parClass._id}>
                        {parClass.class_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='time'
                label='Start time'
                type='time'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                name='start_time'
                value={start_time}
                onChange={onChange}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='time'
                label='Endtime'
                name='end_time'
                type='time'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={end_time}
                onChange={onChange}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
          >
            {props.timing ? 'Update' : 'Add'}
          </Button>
        </form>
      </div>
    </Container>
  );
};
const mapStateToProps = (state, props) => ({ _classes: state.classes });
export default connect(mapStateToProps)(TimingsForm);
