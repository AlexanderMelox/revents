import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';
const { Item } = Menu;

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
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
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Item>
          <Item as={NavLink} to='/events' name="Events" />
          {authenticated && (<Item as={NavLink} to='/people' name="People" />)}
          {authenticated && (
            <Item>
              <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
            </Item>
          )}
          
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
          )}
        </Container>
      </Menu>
    )
  }
}

const actions = {
  openModal
}

export default withRouter(connect(null, actions)(NavBar));
