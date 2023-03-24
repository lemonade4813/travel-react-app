import styled from 'styled-components';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Flight from './components/Flight/Flight';
import Hotel from './components/Hotel/Hotel';
import Restaurant from './components/Restaurant/Restaurant';
const AppDiv= styled.div`
  font-family: var(--font-SCoreDream3Light);
  text-align : center;
`
const MainNav = styled.div`
  background: #ff98a3;
  width: 100%;
  height : 70px;
  display: flex;
  align-items : center;
  justify-content: space-around;
  color: white;
  padding: 20px;
  font-weight: 500;
  font-size: 20px;
  box-sizing: border-box;
`

const LogoName = styled.div`
  font-family: var(--font-geminiMoon);
  font-size: 40px;
  width: 300px;
  margin: 15px;
`
const NavStyle = styled(NavLink)`
  color: white;
  padding: 20px;
  font-size: 20px;
  font-weight: 400;
  font-family : var(--font-ygJalnan);
  border-right : 1px solid white;

  margin: 5px;
  outline: invert;
  &:link {
    transition : 0.3s;
    text-decoration: none;
  }
  &:hover {
  }
  &.active {
    color: #ff98a3;
    position: relative;
    background-color:white;
    padding : 17px;
    border-right : 6px solid #ff6347;
  }
`


function App() {
  return (
    <AppDiv>
    <BrowserRouter>
      <MainNav>
        <LogoName>Carpe Diem</LogoName>
        <NavStyle to='/'>항공권 예약</NavStyle>
        <NavStyle to='/hotel'>호텔 예약</NavStyle>
        <NavStyle to='/restaurant'>식당 예약</NavStyle>
      </MainNav>
      <Routes>
        <Route path='/' element={<Flight/>} />
        <Route path='/hotel' element={<Hotel/>} />
        <Route path='/restaurant' element={<Restaurant/>} />
      </Routes>
    </BrowserRouter>
  </AppDiv>
  );
}

export default App;
