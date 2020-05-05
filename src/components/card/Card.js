import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardExampleGroups = ({cardList, quickReview, removeItem, addToCart, cart}) => (
  <Card.Group>
    {cardList.map(({name, price, size, description, count})=>{
        console.log('tt', cardList);
        return <Card>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta> Size: {size}</Card.Meta>
          <Card.Meta> Price:  {price}</Card.Meta>

          <Card.Description>
           Description: {description}
          </Card.Description>
          {removeItem && <Card.Meta> No of items in cart:  {count}</Card.Meta>}
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {!removeItem && <Button onClick={()=>quickReview(name)}  basic color='green'>
              Quick view
            </Button>}
            {!removeItem && !cart.find(item=>item.name==name) && <Button basic color='red' onClick={()=>addToCart(name)}>
              Add to cart
            </Button>}
            {!removeItem && cart.find(item=>item.name==name) &&<Button basic color='red' onClick={()=>addToCart(name)}>
              Added to Cart
            </Button>}
            {removeItem&&<Button basic color='red' onClick={()=>removeItem(name)} >
              Remove From Cart
            </Button>}
          </div>
        </Card.Content>
      </Card>
    })}
  </Card.Group>
)

export default CardExampleGroups;


//{name: "Product1", price:1200, size: 12, description: "some description" }