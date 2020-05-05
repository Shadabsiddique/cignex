import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"


const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #8080803d;
  margin: 10px;
  color: #b35757;
`;

const HeaderTab = styled.div`
  padding: 10px 20px;
  font-size: 32px;
`;
export default ({children, list=[], cart}) => {
        return <Header>
{list.map(item=><NavLink to={item=='Product' ? "/" : item.toLowerCase()} ><HeaderTab><span>{item} {item.toLowerCase()=='cart' ? `(${cart.length})`  : ""} </span></HeaderTab></NavLink>)}
            {children}
        </Header>;
}