import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
const { Item } = Menu;

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.setState({
      authenticated: true
    });
  }

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/');
  }


  render() {
    const { authenticated } = this.state;
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
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(NavBar);
