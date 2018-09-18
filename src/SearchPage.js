import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import _ from 'lodash'
class SearchPage extends Component {

    constructor() {
        super()
        this.search = _.debounce(this.search, 500)
    }
    state = {
        searchedItems: [],
        error: ''
    }

    acceptedTerms = [
        'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
        'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development',
        'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
        'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
        'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry',
        'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction',
        'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ]

    search = (query) => {
        this.setState((prev) => ({
            searchedItems: [...prev.searchedItems],
            error: ''
        }))

        this.props.setLoader();
        let hasTerms = this.acceptedTerms.find(item => item.toLowerCase().includes(query.toLowerCase()));
        if (hasTerms) {
            BooksAPI.search(query)
                .then(items => {

                    //Read actual shelfs and set shelf on searched item 
                    Object.keys(this.props.onShelfs).map(key => {
                        Object.values(this.props.onShelfs[key]).map(book => {
                            items.forEach(itemBook => {
                                if (itemBook.id === book.id)
                                    itemBook.shelf = book.shelf;
                            })
                        })
                    })
                    this.setState(() => ({
                        searchedItems: items
                    }))

                    this.props.finishLoader()
                })
        }
        else {
            if (query.length > 0) {
                this.setState(() => ({
                    searchedItems: [],
                    error: this.acceptedTerms
                }))
            }



            this.props.finishLoader()
        }
    }

    selectShelf = (book, shelf) => {
        this.props.selectShelf(book, shelf)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <Link to='/' className="close-search">Close </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(e) => { this.search(e.target.value) }} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedItems.map((book) => (
                            <Book key={book.id} book={book} onSelectShelf={this.selectShelf} />
                        ))}
                    </ol>
                </div>
                {this.state.error && (
                    <div style={style}>
                        <p> Use only these therms for search a book:  </p>
                        <div className='error'> {this.state.error.map((term) => {
                            return term.concat(', ') //Concat ',' to separate therms
                        })}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const style = {
    backgroundColor: '#dc3545',
    color: '#FFF',
    fontFamily: 'Sans-serif',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'center'
}

export default SearchPage