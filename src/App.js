import React, { Component } from 'react';
import './App.css';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkApp from './BookmarkApp/BookmarkApp';

// const bookmarks = [
//   {
//     title:"Google",
//     url:"http://www.google.com", 
//     rating:"3", 
//     description:"No evil"
//   },
//   {
//     title:"Google",
//     url:"http://www.google.com", 
//     rating:"3", 
//     description:"No evil"
//   }
// ];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false, // pre-ReactRouter, innit?
    }
  }

  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$Y69Ld.zBy31musESl98VHOs1ZUlvHDWAJ4rRE9uSNl9gO7ZvBB0WS",
        "Content-Type": "application/json",
      }
    };

    fetch(url,options)
      .then(response => {
        if(!response.ok) {
          throw new Error("Something went wrong. Please try again later.")
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    })
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false,
    })
  }

  render() {
    const page = this.state.showAddForm
      ? <AddBookmark 
          showForm={show => this.setShowAddForm(show)}
          handleAddBookmark={bookmark => this.addBookmark(bookmark)}
        />
      : <BookmarkApp 
          bookmarks={this.state.bookmarks}
          showForm={show => this.setShowAddForm(show)}
        />

    return (
      <div className="App">
        { page }
      </div>
    );
  }
}
