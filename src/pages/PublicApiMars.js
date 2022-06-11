import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PublicApiMars() {
  const { REACT_APP_KEY } = process.env;
  const apiKey = REACT_APP_KEY;
  const publicApi_Url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

  const response = axios.get(`${publicApi_Url}`, {
    withCredentials: false,
  });

  console.log(response);
  // console.log(Object.getPrototypeOf(response) == Promise.prototype);

  const [url, setUrl] = useState();
  const [explanation, setExplanation] = useState();
  const [data, setData] = useState();
  // const [copyright, setCopyright] = useState();

  async function fetchData() {
    console.log((await response).data.photos[0].img_src);
    setUrl((await response).data.photos[0].img_src);
  }
  fetchData();

  return (
    <div>
      <img src={url} />
    </div>
  );
}
