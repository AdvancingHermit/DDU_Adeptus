import React, {useState} from "react";

export default function App() {

  const [toggle, setToggle] = useState(true);

  function h() {
      setToggle(prevState => !prevState)
  }

return(
  <div>
      <button onClick={h}>Heading</button>
      {toggle ? (<h1>Hello world</h1>) : null}
  </div>
  ) 
}