import React from 'react';

export default class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            type: 'Most Popular',
            time: 'This Week',
            typeMenu: false,
            timeMenu: false
        }
    }

    toggleMenu = menu => {
        this.setState({menu: !this.state[menu]})
    }

    handleChange = (key, value) => {
        this.setState({[key]: value})
    }

    render() {
        return (
        <div className='filter-container'>
            
        </div>
        )
    }
}