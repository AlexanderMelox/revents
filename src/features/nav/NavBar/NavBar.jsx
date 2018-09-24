import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
const { Item } = Menu;

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Item as={Link} to='/'>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Item>
          <Item as={NavLink} to='/events' name="Events" />
          <Item as={NavLink} to='/people' name="People" />
          <Item>
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
          </Item>
          <Item position="right">
            <Button basic inverted content="Login" />
            <Button basic inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
          </Item>
        </Container>
      </Menu>
    )
  }
}

export default NavBar;
