import React from 'react';
import { Button, Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput, Row} from "shards-react";
import axios from 'axios';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            typeMenu: false,
            timeMenu: false,
            type: 'Most Popular',
            time: 'This Week',
            search: '',
            results: false
        }
    }

    toggle = menu => {
        this.setState({[menu]: !this.state[menu]})
    }

    handleChange = (key, value) => {
        this.setState({[key]: value})
    }

    filter = () => {
        const { type, time } = this.state;
        if (type==='Newest') {
            this.clear();
        } else {
            this.setState({search: '', results: false});
            axios.get('/api/sortPosts', {type, time}).then(res => {
                this.props.updatePosts(res.data)
            })
        }
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
                this.search()
        }
    }

    clear = () => {
        this.setState({search: '', results: false});
        this.props.reload();
    }

    search = () => {
        const {search} = this.state;
        if (search==='') {
            this.props.reload();
        } else {
            axios.get(`/api/searchPosts/${search}`).then(res => {
                this.props.updatePosts(res.data);
                this.setState({results: true})
            });
        }
    }

    render() {
        return (
            <Container className='header-container'>
                <Row>
                    <Col sm='3' lg='2' className='title'>
                        <h1>Sermo</h1>
                    </Col>
                    <Col sm='12' lg='6' className='search'>
                        <FormInput value={this.state.search} onKeyUp={this.handleKeyPress} placeholder='Search Sermo' onChange={e => {this.handleChange('search', e.target.value)}}/>
                        {this.state.results ? <button onClick={this.clear}>Clear Search</button> : null}
                    </Col>
                    <Col sm='9' lg='4' className='filters'>
                        <Dropdown open={this.state.typeMenu} toggle={() => {this.toggle('typeMenu')}}>
                            <DropdownToggle outline theme='light'><h2>{this.state.type}</h2><i className="ion-md-arrow-dropdown"></i></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Most Popular')}} >Most Popular</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Most Comments')}} >Most Comments</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Trending')}} >Trending</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Newest')}} >Newest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {this.state.type==='Newest'||this.state.type==='Trending' ? null : <Dropdown open={this.state.timeMenu} toggle={() => {this.toggle('timeMenu')}}>
                            <DropdownToggle outline theme='light'><h2>{this.state.time}</h2><i className="ion-md-arrow-dropdown"></i></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.handleChange('time', 'Today')}} >Today</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Week')}} >This Week</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Month')}} >This Month</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Year')}} >This Year</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'All Time')}} >All Time</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}
                        <Button outline theme='light' onClick={this.filter}><h2>Update</h2><i className="ion-ios-refresh"></i></Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Header
