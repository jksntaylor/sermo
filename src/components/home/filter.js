import React from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react';

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
        this.setState({[menu]: !this.state[menu]})
    }

    handleChange = (key, value) => {
        this.setState({[key]: value})
    }

    render() {
        return (
        <div className='filter-container'>
            <Dropdown open={this.state.typeMenu} toggle={() => {this.toggleMenu('typeMenu')}}>
                <DropdownToggle>{this.state.type}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => {this.handleChange('type', 'Most Popular')}} >Most Popular</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('type', 'Most Commented')}} >Most Commented</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('type', 'Trending')}} >Trending</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('type', 'Newest')}} >Newest</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {this.state.type==='Newest' ? null : <Dropdown open={this.state.timeMenu} toggle={() => {this.toggleMenu('timeMenu')}}>
                <DropdownToggle>{this.state.time}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => {this.handleChange('time', 'Today')}} >Today</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('time', 'This Week')}} >This Week</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('time', 'This Month')}} >This Month</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('time', 'This Year')}} >This Year</DropdownItem>
                    <DropdownItem onClick={() => {this.handleChange('time', 'All Time')}} >All Time</DropdownItem>
                </DropdownMenu>
            </Dropdown>}
            <Button><i className="fas fa-sync-alt"></i></Button>
        </div>
        )
    }
}