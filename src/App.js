import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {Repos} from './components/Repos.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      username:'facebook'
    };
    this.fetchRepoDetails = this.fetchRepoDetails.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(name){
    this.setState({
      username:name
    })
  }

  fetchRepoDetails(){
    fetch(`https://api.github.com/users/${this.state.username}/repos`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        console.log(error);
      }
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.username !== prevState.username) {
      this.fetchRepoDetails();
    }
  }

  componentDidMount() {
    this.fetchRepoDetails();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (<Repos 
                  items={this.state.items} 
                  usernameUpdater={this.updateUsername}
                  username={this.state.username}/>);
    }
  }
}

export default App;
