
import React, { Component } from 'react'

class Book extends Component {

    state = {
        shelf: ''
    }

    setShelf = (shelf) => {
        this.setState(() => ({
            shelf
        }))

        this.props.onSelectShelf(this.props.book, shelf)
    }


    componentDidMount() {
        if (this.props.book) {
            this.setState(() => ({
                shelf: this.props.book.shelf
            }))
        }
    }

    render() {
        const { book } = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        {book.imageLinks && (
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        )}
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf || 'none'} onChange={(e) => this.setShelf(e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (
                        <div className="book-authors"> {book.authors.map((author, index) => (
                            <div key={index}> {author} </div>
                        ))} </div>
                    )}

                </div>
            </li>
        )
    }
}


export default Book;