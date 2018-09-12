import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
const { Item } = Menu;

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Item>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Item>
          <Item name="Events" />
          <Item>
            <Button floated="right" positive inverted content="Create Event" />
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
