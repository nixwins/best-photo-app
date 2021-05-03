import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

    state = {
        term: ''
    }

    onQueryChange = (e) => {
        this.setState({ term: e.currentTarget.value })
    }

    onSubmit = (e) => {

        e.preventDefault();
        const { onSearch } = this.props;
        this.setState({ term: '' })
        onSearch(this.state.term);
    }

    render() {

        return (
            <form className="search-panel row md-12" onSubmit={this.onSubmit}>
                <input
                    className="search-panel-query"
                    placeholder="Type here for search photo...."
                    onChange={this.onQueryChange} />
            </form>

        );
    }
}