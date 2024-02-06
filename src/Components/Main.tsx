import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { CHAT_ID, INITIAL_TEACHERS, SHEETS_API, TG_API } from "../constants";
import { GROUPS, Teacher } from "../models/teachers.model";
import {
  isTeacherExist,
  loadGroups,
  saveNewGroup,
  updateExistGroup,
} from "../service/local-storage.service";
import { StylesConfig } from "react-select";
import Select from "react-select";
function getRandomNumber() {
  return Math.floor(Math.random() * 21);
}
const customStyles: StylesConfig<Teacher, boolean> = {
  container: (provided) => ({
    ...provided,
    width: 274,
    height: 54,
    borderRadius: 5,
    border: "2px solid black",
    boxShadow: "4px 4px black",
    fontSize: "15px",
  }),
  control: (provided) => ({
    ...provided,
    height: "100%",
    backgroundColor: "beige",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#666",
    opacity: 0.8,
    fontWeight: 600,
  }),
};

function Main() {
  const [groupName, setGroupName] = useState("");
  const [amount, setAmount] = useState(0);
  const selectRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName && amount) {
      if (isTeacherExist(groupName)) {
        updateExistGroup(groupName, amount);
      } else {
        saveNewGroup({
          id: getRandomNumber(),
          label: groupName,
          value: groupName,
          amount: Number(amount),
        });
      }
      clearForm();
      alert("Информация успешно отправлена");
    } else {
      alert("Заполните все поля!!!");
      return;
    }
  };

  useEffect(() => {
    // const array = loadGroups();
    // array.forEach((item: any) => sendFinalMessage(item));
    const sendFinalMessage = (data: any) => {
      // const finalMessage = generateFinalMessage(data);
      axios
        .post(TG_API, {
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: "finalMessage",
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    };
    setTimeout(() => sendFinalMessage(""), 2000);
  }, []);

  // useEffect(() => {
  //   axios
  //     .post(TG_API, {
  //       chat_id: CHAT_ID,
  //       parse_mode: "html",
  //       text: "message",
  //     })
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));
  // }, []);

  const generateFinalMessage = (data: any) => {
    return `
    Группа: ${data.value};
    кол-во: ${data.amount}
    `;
  };

  const handleChange = (option: any) => setGroupName(option.value);

  const handleAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const clearForm = () => {
    setAmount(0);
    setGroupName("");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
        <div className="title">Список учащихся на питание</div>
        <Select
          ref={selectRef}
          options={INITIAL_TEACHERS}
          onChange={handleChange}
          value={
            INITIAL_TEACHERS.filter((item) => item.value === groupName) || null
          }
          placeholder="Группа"
          styles={customStyles}
        />
        <input
          className="input"
          name="date"
          placeholder="Кол-во голодных учеников"
          type="number"
          min={0}
          max={30}
          value={amount}
          onChange={handleAmount}
        />

        <button className="button-confirm" type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
export default Main;
