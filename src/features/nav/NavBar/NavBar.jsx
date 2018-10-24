import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';
const { Item } = Menu;

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
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
            <SignedInMenu auth={auth} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
          )}
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const actions = {
  openModal,
  logout
}

export default withRouter(
  withFirebase(connect(mapStateToProps, actions)(NavBar))
);
