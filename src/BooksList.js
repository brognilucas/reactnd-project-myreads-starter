import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
class BooksList extends Component {

    componentDidMount() {
        this.props.getBooks()
    }

    selectShelf = (book, shelf) => { 
        this.props.selectShelf(book, shelf)
    }

    render() {
        const { shelfs , books} = this.props
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelfs.map((shelf) => (
                                <div key={shelf.key} className="bookshelf">
                                    <h2 className="bookshelf-title"> {shelf.label} </h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            { books[shelf.key].map((book) => (
                                                <Book key={book.id} book={book} onSelectShelf={this.selectShelf} />
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BooksList