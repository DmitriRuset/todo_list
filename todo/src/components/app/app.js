import React, { Component } from 'react';

import AppHeader from "../app-header";
import SearchBar from "../search-bar";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItemBar from "../add-item-bar";

export default class App extends Component {

    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //all, active, done
    };

    searchItems = (data, text) => {
        return data.filter((item) => {
            return item.label.toLowerCase().includes(text.toLowerCase());
        })
    };

    searchChange = (text) => {
        this.setState({
            term: text
        })
    };

    filterItems = (data, filter) => {
        switch(filter) {
            case 'all':
                return data;
            case 'active':
                return data.filter(({ done }) => !done);
            case 'done':
                return data.filter(({ done }) => done);
            default:
                return data;
        }
    }

    filterChange = (filter) => {
        this.setState({
            filter: filter
        })
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newData
            };
        })
    }

    addItem = (text) => {

        const newItem = this.createTodoItem(text);

        this.setState( ({todoData}) => {
            const newData = [...todoData, newItem];

            return {
                todoData: newData
            };
        })
    };

    onToggle(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.onToggle(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.onToggle(todoData, id, 'done')
            };
        });
    };

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filterItems(this.searchItems(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchBar onSearch={this.searchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.filterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <AddItemBar onAdded={this.addItem}/>
            </div>
        );
    }
};