import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PublciApiApod() {
  const { REACT_APP_KEY } = process.env;
  const apiKey = REACT_APP_KEY;
  const publicApi_Url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const response = axios.get(`${publicApi_Url}`, {
    withCredentials: false,
  });

  // console.log(response);
  // console.log(Object.getPrototypeOf(response) == Promise.prototype);

  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();

  async function fetchData() {
    setTitle((await response).data.title);
    setUrl((await response).data.url);
    setDate((await response).data.date);
  }
  fetchData();

  return (
    <div>
      <h1>{title}</h1>
      <img src={url} />
      <p>Date of capture: {date}</p>
    </div>
  );
}
