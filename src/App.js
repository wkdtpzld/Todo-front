import Todo from './Todo';
import './App.css';
import AddTodo from './AddTodo.js';
import React from 'react';
import { Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button } from "@material-ui/core";
import { call, signout } from './service/ApiService';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };
  }
  
  componentDidMount(){
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    var todoList = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );
    
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent='space-between' container>
            <Grid item>
              <Typography variant='h6'>Today</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )

    var todoListPage = (
      <div className='App'>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoList}</div>
        </Container>
      </div>
    )

    var loadingPage = <h1>로딩중</h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return <div className='App'>{content}</div>;
  }
}

export default App;
