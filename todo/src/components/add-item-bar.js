import React, { Component } from 'react'

import './add-item-bar.css';

class AddItemBar extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                    onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="What do you want to do?"
                       value = {this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        );
    }
}

export default AddItemBar;