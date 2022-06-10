import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function PublicApi() {
  const { REACT_APP_KEY } = process.env;
  const apiKey = REACT_APP_KEY;
  const publicApi_Url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const response = axios.get(`${publicApi_Url}`, {
    withCredentials: false,
  });

  // console.log(response);
  // console.log(Object.getPrototypeOf(response) == Promise.prototype);

  const [url, setUrl] = useState();
  const [explanation, setExplanation] = useState();
  // const [data, setData] = useState();
  // const [copyright, setCopyright] = useState();

  async function fetchData() {
    setUrl((await response).data.url);
    console.log((await response).data.url);
    setUrl((await response).data.explanation);
    console.log((await response).data.explanation);
    // setCopyright((await response).data.copyright);
    // console.log((await response).data.copyright);
  }
  fetchData();

  return (
    <div>
      <img src={url} />
      <p>{explanation}</p>
    </div>
  );
}
