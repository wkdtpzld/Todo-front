import { Button, Container, Grid, Link, TextField, Typography } from "@material-ui/core";
import React from "react";
import { signin } from "../service/ApiService";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handlerSumbit = this.handlerSumbit.bind(this);
    }

    handlerSumbit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        signin({ email: email, password: password })
            .catch((error) => {
                if (error.error === "Login Failed") {
                    alert("이메일 또는 비밀번호를 확인하세요.")
                }
            });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={this.handlerSumbit}>
                    {" "}
                    {/* submit 버튼 클릭시 handleSubmit 실행 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                name="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Link href="/signup" variant="body2">
                            <Grid item>계정이 없다면.. 회원가입으로</Grid>
                        </Link>
                    </Grid>
                </form>
            </Container>
        );
    }

}

export default Login;