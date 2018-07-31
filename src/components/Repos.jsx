import React from 'react'
import Immutable from 'immutable';

export class Repos extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue:''
        }
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateSearchItem = this.updateSearchItem.bind(this);
    }

  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  updateSearchItem(){
    this.props.usernameUpdater(this.state.inputValue);
  }

  showDescription(description,id){
    document.querySelector('.descriptionBox').innerText = description;
    document.getElementById(id).style.visibility = 'visible';
  }

  hideDescription(id){
    document.querySelector('.descriptionBox').innerText = '';
    document.getElementById(id).style.visibility = 'hidden';
  }

  getRandomIndex () {
    return Math.floor(Math.random()*5)
  }

  getColor (index) {
    const colors = Immutable.Map()
    .set(0,'#3173d4')
    .set(1,'#2e913b')
    .set(2,'#e4c438')
    .set(3,'#e78224')
    .set(4,'#da3911')
    return colors.get(index);
  }
  render(){
    if(this.props.items[0]){
        return (<div>
            <div className='header'>
            <div className='userName'>
                <h1><i className='fa fa-github'></i>&nbsp;{this.props.items[0].owner.login}</h1>
            </div>
            <div className='descriptionBox'></div>
            <div className='searchBar'>
                <input type='text' className='searchBox' onChange={this.updateInputValue} placeholder='enter github username'/>
                <button className='searchButton' onClick={this.updateSearchItem}><i className='fa fa-search'></i></button>
            </div>
            </div>
            <div className='container'>
                {this.props.items.map(repo => {
                    const bg = {
                    backgroundColor : this.getColor(this.getRandomIndex())
                    };                  
                    return (
                        <div className='reposBox'style = {bg} 
                        onClick={()=>window.open(repo.html_url, "_blank")} 
                        onMouseOver={()=>this.showDescription(repo.description,repo.id)}
                        onMouseOut={()=>this.hideDescription(repo.id)}>
                            <div class="ribbon" id={repo.id}>{repo.language}</div>
                            <div className='repoName'>{repo.name}</div>
                        </div>);
                })}
            </div>
            </div>)
        }
        else return (
            <div>
                <div className='header'>
                    <div className='searchBar'>
                        <input type='text' className='searchBox' onChange={this.updateInputValue} placeholder='enter github username'/>
                        <button className='searchButton' onClick={this.updateSearchItem}><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className='invalidUserMessage'>{this.props.username} is not a valid username</div>
            </div>
        );
    };
}