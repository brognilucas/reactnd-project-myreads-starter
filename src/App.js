import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import Loader from 'react-loader';
class BooksApp extends React.Component {

  shelfs = [{ label: 'Want to Read', key: 'wantToRead' }, { label: 'Currently Reading', key: 'currentlyReading' }, { label: 'Read', key: 'read' }]

  selectShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((response) => {
        this.moveBooks()
      })
  }

  moveBooks() {
    this.getBooks()
  }

  state = {
    wantToRead: [],
    read: [],
    currentlyReading: [],
    finishLoader: true
  }

  initialState = {
    wantToRead: [],
    read: [],
    currentlyReading: []
  }

  updateState = (book, shelf) => {
    this.setState((prev) => ({
      [shelf]: [...prev[shelf], book]
    }))

  }

  getBooks = async () => {
    this.setState(() => ({
      finishLoader: false
    }))

    this.setState(this.initialState)
    let books = await BooksAPI.getAll()


    books.forEach(book => {
      this.updateState(book, book.shelf);
    });


    this.setState(() => ({
      finishLoader: true
    }))
  }

  render() {

    return (
      <div className="app">

        <Loader loaded={this.state.finishLoader} />
        <Route exact path='/' render={() => (

          <BooksList
            shelfs={this.shelfs}
            books={this.state}
            getBooks={this.getBooks}
            selectShelf={this.selectShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage selectShelf={this.selectShelf} onShelfs={this.state} setLoader={() => this.setState(() => ({
            finishLoader: false
          }))} finishLoader={() => this.setState(() => ({
            finishLoader: true
          }))} />
        )} />
      </div>
    )
  }
}

export default BooksApp
