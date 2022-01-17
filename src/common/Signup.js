import React from "react";
import { Button, TextField, Link, Grid, Container, Typography } from "@material-ui/core";
import { signup } from "../service/ApiService";
import '../App.css';

class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            item: { username: "", email: "", password: "" },
            error: { username: false, email: false, password: false }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChangeUsername = (e) => {
        const thisItem = this.state.item;
        thisItem.username = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
        var check = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (check.test(this.state.item.username) === true) {
            this.state.error.username = false;
        } else {
            this.state.error.username = true;
        }
    }

    onInputChangePassword = (e) => {
        const thisItem = this.state.item;
        thisItem.password = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
        const check = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
        if (check.test(this.state.item.password) === true) {
            this.state.error.password = false;
        } else {
            this.state.error.password = true;
        }
    }

    onInputChangeEmail = (e) => {
        const thisItem = this.state.item;
        thisItem.email = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
        const check = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (check.test(this.state.item.email) === true) {
            this.state.error.email = false;
        } else {
            this.state.error.email = true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const regId = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (regId.test(username) !== true) {
            alert("올바르지 않은 이메일 입력 방식")
            
            return
        }

        const email = data.get("email");
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (regEmail.test(email) !== true) {
            alert("올바르지 않은 이메일 입력 방식")
            return
        }

        const password = data.get("password");
        const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
        if (regExp.test(password) !== true) {
            alert("올바르지 않은 비밀번호 입력 방식")
            return
        }

        signup({ email: email, username: username, password: password })
            .then((response) => {
                window.location.href = "/login"
            }
        ).catch((error) => {
            if (error.error === "Email already exists") {
                alert("이미 등록된 이메일 입니다.")
                return
            }
        })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={this.onInputChangeUsername}
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
                                error={this.state.error.username}
                                helperText={this.state.error.username ? "영어를 포함한 6글자 이상 입력" : ""}
                                value={this.state.item.username}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={this.onInputChangeEmail}
                                value={this.state.item.email}
                                autoComplete="fname"
                                name="email"
                                variant="outlined"
                                
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                autoFocus
                                error={this.state.error.email}
                                helperText={this.state.error.email ? "올바른 이메일 주소가 아닙니다." :""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={this.onInputChangePassword}
                                value={this.state.item.password}
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                
                                fullWidth
                                id="password"
                                type="password"
                                label="비밀번호 입력"
                                autoFocus
                                error={this.state.error.password}
                                helperText={this.state.error.password ? "영어,숫자를 포함한 8글자 이상의 비밀번호" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                            계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있다면. 로그인으로
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default Signup;