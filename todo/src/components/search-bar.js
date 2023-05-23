import React, { Component } from 'react';

class SearchBar extends Component {

    onSearchChange = (event) => {
        event.preventDefault();
        this.props.onSearch(event.target.value);
    }

    render() {
        const searchText = 'Type here to search';
        const searchStyle = {
            fontSize: '20px'
        };

        return <input
            style={searchStyle}
            onChange={this.onSearchChange}
            placeholder={searchText} />;
    }
}

export default SearchBar;