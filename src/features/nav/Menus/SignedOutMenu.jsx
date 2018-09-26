import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
const { Item } = Menu;

const SignedOutMenu = ({ signIn }) => {
  return (
    <Item position="right">
      <Button onClick={signIn} basic inverted content="Login" />
      <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
    </Item>
  )
}

export default SignedOutMenu;