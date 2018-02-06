import React from 'react'
import {Alert} from '@auth0/styleguide-react-components';

const MessageAlert = ({errorMessage, infoMessage, clearAlert}) => (
  <Alert bsStyle={errorMessage?"danger": "info"} onDismiss={clearAlert}>
    <p>{errorMessage?errorMessage: infoMessage}</p>
  </Alert>
)

export default MessageAlert;