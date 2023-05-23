import React from 'react';

import './app-header.css';

const AppHeader = ({toDo, done}) => {
    return (
        <div>
            <h1 className="app-header d-flex">My Todo List</h1>
            <h2>{toDo} remains, {done} done</h2>
        </div>
    );
};

export default AppHeader;