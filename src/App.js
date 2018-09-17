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

  setStateWant = (book) => {
    this.setState((prev) => ({
      wantToRead: [...prev.wantToRead, book]
    }))
  }

  setStateCurrently = (book) => {
    this.setState((prev) => ({
      currentlyReading: [...prev.currentlyReading, book]
    }))
  }

  setStateRead = (book) => {
    this.setState((prev) => ({
      read: [...prev.read, book]
    }))
  }

  getBooks = () => {
    this.setState( () => ({
      finishLoader: false 
    }))

    this.setState(this.initialState)
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          if (book.shelf === 'wantToRead') {
            this.setStateWant(book)
          }
          else if (book.shelf === 'currentlyReading') {
            this.setStateCurrently(book)
          }
          else {
            this.setStateRead(book)
          }
          
          this.setState( () => ({
            finishLoader: true 
          }))
        });
      })
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
          <SearchPage selectShelf={this.selectShelf} onShelfs={this.state} setLoader={ () => this.setState( () => ({
            finishLoader: false
          }))}  finishLoader={ () => this.setState( () => ({
            finishLoader: true
          }))} />
        )} />
      </div>
    )
  }
}

export default BooksApp
