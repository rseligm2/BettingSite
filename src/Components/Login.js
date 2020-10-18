import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { selectUser,
         checkLoggedIn,
         login,
         logout
} from './loginSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        // variant: "outlined",
        // margin: "auto",
        // width: '100%',
},
    submit: {
        margin: theme.spacing(3, 1, 2),
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
  }));

const Login = (props) => {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const count = useSelector(selectUser)
    const dispatch = useDispatch()

    const history = useHistory();

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/api/authenticate', {
            crossDomain:true,
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data))
                console.log(res.data)
                history.push("/home");
                // window.location.reload();
            //   return <Redirect to="/home" />
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
          });

    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.root} >
                <h3>
                    Login
                </h3>
                <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit} >
                    <TextField 
                        id="username" 
                        label="Username" 
                        className={classes.textField}
                        margin="normal"
                        required
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)} />
                    <TextField 
                        id="password" 
                        label="Password" 
                        type="password"
                        margin="normal"
                        fullWidth
                        required
                        className={classes.textField}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button
                        fullWidth
                        variant="contained"
                        type='submit'
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
export default Login