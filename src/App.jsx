import { useState, useEffect } from "react";
import Select from "./components/Select";
import { Diagramma } from "./components/Diagramma";
function App() {
  const [selectOption, setSelectOption] = useState("by_goods");
  const [hoursX, setHoursX] = useState([]);
  const [dataY, setDataY] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3000/${selectOption}`);
      const data = await response.json();
      const hours = Object.keys(data);
      const goodsOrOptions = Object.values(data);
      setDataY(goodsOrOptions);
      setHoursX(hours);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectOption]);
  return (
    <div style={{ width: "2000px", height: "500px" }}>
      <Select selectOption={selectOption} setSelectOption={setSelectOption} />
      <Diagramma hoursX={hoursX} dataY={dataY} />
    </div>
  );
}

export default App;
