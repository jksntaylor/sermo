import React from 'react';
import { Button, Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput, Row} from "shards-react";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            typeMenu: false,
            timeMenu: false,
            type: 'Most Popular',
            time: 'This Week',
            search: '',
        }
    }

    toggle = menu => {
        this.setState({[menu]: !this.state[menu]})
    }

    handleChange = (key, value) => {
        this.setState({[key]: value})
    }

    filter = () => {

    }

    search = () => {
        
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Sermo</h1>
                    </Col>
                    <Col>
                        <Dropdown open={this.state.typeMenu} toggle={() => {this.toggle('typeMenu')}}>
                            <DropdownToggle><h2>{this.state.type}</h2><i className="fas fa-sort-down"></i></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Most Popular')}} >Most Popular</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Most Commented')}} >Most Commented</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Trending')}} >Trending</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('type', 'Newest')}} >Newest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {this.state.type==='Newest' ? null : <Dropdown open={this.state.timeMenu} toggle={() => {this.toggle('timeMenu')}}>
                            <DropdownToggle><h2>{this.state.time}</h2><i className="fas fa-sort-down"></i></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.handleChange('time', 'Today')}} >Today</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Week')}} >This Week</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Month')}} >This Month</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'This Year')}} >This Year</DropdownItem>
                                <DropdownItem onClick={() => {this.handleChange('time', 'All Time')}} >All Time</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}
                        <Button><h2>Update</h2><i className="fas fa-sync-alt"></i></Button>
                    </Col>
                    <Col>
                        <FormInput placeholder='Search Sermo' onChange={e => {this.handleChange('search', e.target.value)}}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Header