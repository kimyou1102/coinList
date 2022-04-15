import { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [type, setType] = useState('');
  const [submit, setSubmit] = useState(false);
  const [select, setSelect] = useState('');
  const [price, setPrice] = useState(0);
  const [money, setMoney] = useState(0);

  const onChangeMoney = (event) => {
    setMoney(event.target.value)
    setSubmit(false);
  };
  const onChangeType = (event) => {
    setType(event.target.value);

  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
  }
  const onClick = (event) => {
    console.log(event.target.className);
    setMoney(0);
    setSelect(event.target.className);
  }
  const selectChange = (event) => {
    setPrice(event.target.value);
    console.log(event.target.value);
  }

  const onChange = (event) => {
    setMoney(event.target.value)
  }

  const TypeAndMoney = () => {
    return(
      <div>
        <form onSubmit={onSubmit}>
          <label id="typeInput">코인 종류: </label>
          <input id="typeInput" type="text" value={type} onChange={onChangeType} placeholder="Write the type you want"/>
          <button>입력</button>
        </form>

        <form onSubmit={onSubmit}>
          <label id="moneyInput">금액: </label>
          <input id="moneyInput" type="text" value={money} onChange={onChangeMoney} placeholder="Write your money"/>
          <button>입력</button> 
        </form>

        {submit ? 
        money > 0 ? <UlWithMoney/> : <Ul />
        : null}
      </div>
    )
  }
  const SelectCoin = () => {
    return(
      <div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={money} placeholder="Write your money"/>
          <select onChange={selectChange}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
        <button>확인</button>
        </form>
        {submit? <h2>you can get {(money/ price).toFixed(4)} coins</h2> : null}
      </div>
    )
  }

  const Ul = () => {
    return(
      <ul>
        {coins.map((coin) => (
          coin.name.split(' ').includes(type)? 
          <li key={coin.id}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
          </li>
        : null))}
      </ul>
    )
  }

  const UlWithMoney = () => {
    return(
      <ul>
        {coins.map((coin) => (
          coin.name.split(' ').includes(type) && coin.quotes.USD.price <= money? 
          <li key={coin.id}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
          </li>
        : null))}
      </ul>
    )
  }
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setCoins(json);
      setLoading(false);
    });
  }, []);

  return (
    <div>
    <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
    {loading ? <strong>Loading...</strong> : 
    <div onClick={onClick} className="btnWrap" style={{marginTop: '50px', display: 'block'}}>
      <button className="typeSelect">Coin Type Select<br />(List of coins available for purchase)</button>
      <button className="coinSelect">Coin Select<br />(Number of coins that can be purchased)</button>
    </div>
    }
    <br/>
    {select === 'typeSelect' ? <TypeAndMoney /> : null}
    {select === 'coinSelect' ? <SelectCoin/> : null}

  </div> 
  )
}

export default App;
