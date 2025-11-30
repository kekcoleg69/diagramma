import React from "react";

export default function Select({ selectOption, setSelectOption }) {
  return (
    <div>
      <h2>Суточная нагрузка</h2>
      <select
        value={selectOption}
        onChange={(evt) => {
          setSelectOption(evt.target.value);
        }}
      >
        <option value="by_goods">По товарам</option>
        <option value="by_operation">По работам</option>
      </select>
    </div>
  );
}
