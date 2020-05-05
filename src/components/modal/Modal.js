import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

export default ({isOpen, addToCart, onClose, data : {name, size, price} } = {} ) => (
  <Modal open={isOpen} onClose={onClose} closeOnDocumentClick={true}
  actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
  >
    <Modal.Header>{name}</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Size: {size}</Header>
        <Header>Price: {price}</Header>
      </Modal.Description>
      <Modal.Actions>
            <Button
              onClick={()=>addToCart(name)}
              icon='checkmark'
              labelPosition='right'
              content='Add to Cart'
            />
          </Modal.Actions>
    </Modal.Content>
  </Modal>
)