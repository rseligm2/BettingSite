import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { selectUser,
         checkLoggedIn,
         loginService,
         checkLoginStatus,
         reset,
         checkRegisterStatus,
         registerService,
         checkError
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
        margin: theme.spacing(2, 3, 2),
        flex: '1 1 100px',
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
      },
  }));

const Login = (props) => {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const classes = useStyles();

    const loginStatus = useSelector(checkLoginStatus)
    const registerStatus = useSelector(checkRegisterStatus)

    const error = useSelector(checkError)

    const loggedIn = useSelector(checkLoggedIn)

    const handleSubmit = (e) => {
        // console.log(loginStatus)
        e.preventDefault()
        if(loginStatus === 'idle'){
            // console.log("dispatching login service")
            dispatch(loginService({username, password}))
            // history.push("/home");
        }
    }

    const handleRegister = (e) => {
        // console.log(registerStatus)
        e.preventDefault()
        if(registerStatus === 'idle'){
            // console.log("dispatching register service")
            dispatch(registerService({username, password}))
        }
    }

    if(loginStatus === 'succeeded'){
        // console.log(user)
        localStorage.setItem("user", JSON.stringify(user))
        return(
            <Redirect to="/home" />
        )
    }

    if(loginStatus === 'failed'){
        if(error.message === "Unauthorized"){
            alert('Incorrect username or password')
        }else{
            alert('Internal Server Error')
        }
        dispatch(reset())
    }

    if(registerStatus === 'failed'){
        alert(error.message)
        dispatch(reset())
    }

    if(registerStatus === 'succeeded'){
        alert('Successfully registered!')
        dispatch(reset())
    }

    if(loggedIn === false){
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
                            
                            variant="contained"
                            type='submit'
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                        <Button
                            
                            variant="contained"
                            className={classes.submit}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </Container>
        )
    }
}
export default Login