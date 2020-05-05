import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Header } from "./components/header";
import { Dropdown } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import styled from "styled-components";
import { Card } from './components/card';
import { Modal } from './components/modal';

const HeadersList = ["Product", "Cart"]
const productList = [{ name: "Product1", price: 1300, size: 12, description: "some description" }, { name: "Product2", price: 1200, size: 12, description: "some description" }];
const sortOpts = [
  {
    key: 'lowToHigh',
    text: 'Low To High',
    value: 'lowToHigh',
  },
  {
    key: 'highToLow',
    text: 'high To Low',
    value: 'highToLow',
  }
]

const SelectContainer = styled.div`
display: flex;
margin-bottom: 30px;
span{
  margin-top: 10px;
  font-size: 20px;
  margin-right: 10px;
}
`;
const CardContainer = styled.div`
  padding-left: 30px;
`;


class App extends React.Component {
  state = {
    isReviewModal: false,
    clickedName: null,
    cart: [],
    cartSort:'recentlyAdded',
    productSort: 'lowToHigh'
  }

  quickReview = (clickedName) => {
    this.setState({ isReviewModal: true, clickedName });
  }

  onClose = () => {
    this.setState({ isReviewModal: false })
  }
  addToCart = (name) => {
    let cart = this.state.cart;
    let object = cart.find(item=>item.name===name);
    if(object){
      return;
      // object.count = object.count+1;
    }
    else {
      object = {...productList.find(item=>item.name===name), count:1};
      cart = [...cart, object];
    }
    this.setState({ cart, isReviewModal: false })
  }
  removeItem = (name) => {
  let cart = this.state.cart;
  let object = cart.find(item=>item.name===name);
  if(object) {
      //if(object.count>2) object.count = object.count-1;
      cart = cart.filter(item=>item!==object);
  } 
  this.setState({ cart, isReviewModal: false })
  }

  onSortChange = (e, data, type) => {
    if(type==='product'){
      this.setState({productSort: data.value})
    }
    if(type==='cart'){
      this.setState({cartSort: data.value});
    }

  }

  render() {
    const { isReviewModal, clickedName, cart, cartSort, productSort } = this.state;
    return (
      <Fragment>
        <Header cart={cart} list={HeadersList}>
        </Header>
        {/* <SelectContainer>
          <span>SORT </span><Dropdown
            placeholder='Select order'
            selection

            options={sortOpts}>
          </Dropdown>
        </SelectContainer> */}
        <Route path="/cart" render={() => {
          return <Fragment>
             <SelectContainer>
          <span>SORT </span><Dropdown
            placeholder='Select order'
            selection
            onChange={(e, data)=>this.onSortChange(e, data, 'cart')}
            options={[...sortOpts, {
              key: 'recentlyAdded',
              text: 'Recently Added',
              value: 'recentlyAdded',
            }]}>
          </Dropdown>
        </SelectContainer>
            <CardContainer>
              <Card cart={cart}  cardList={sort( cartSort , cart)}  removeItem={this.removeItem} />
            </CardContainer>
          </Fragment>
        }} />
        <Route exact path="/" render={(props) => {
          return <Fragment>
             <SelectContainer>
          <span>SORT </span><Dropdown
            onChange={(e, data)=>this.onSortChange(e, data, 'product')}
            placeholder='Select order'
            selection
            
            options={sortOpts}>
          </Dropdown>
        </SelectContainer>
            <CardContainer>
              <Card cart={cart} cardList={sort( productSort , productList)} addToCart={this.addToCart} quickReview={this.quickReview} />
            </CardContainer>
            <Modal addToCart={this.addToCart} data={((productList && productList.filter(item => item.name === clickedName)[0]) || {})} isOpen={isReviewModal} onClose={this.onClose} />
          </Fragment>
        }}/>
      </Fragment>
    );
  }
}

export default App;

function sort (type, list){
  if(type=="recentlyAdded"){
    return list
  };
  const prices = list.map(item=>item.price);
  prices.sort(function(a, b){
    return a - b;
  })
  if(type==='lowToHigh'){
    const arr = []
    prices.forEach(price => {
      arr.push(list.find(item=>item.price==price))
    });
    return arr;
  }
  if(type==='highToLow'){
    const arr = []
    for(let i = prices.length-1; i>=0; i--){
      arr.push(list.find(item=>item.price==prices[i]));
    }
    return arr;
  }
}


