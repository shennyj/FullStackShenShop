import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant,children}) => {
  return (
    <Alert
    variant={variant}
    style={{width:'80%',margin:'0 auto'}}
    >
        {children}
    </Alert>
  )
}
export default Message

