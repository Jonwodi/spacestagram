import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/solid";

export default function NasaPublicApis() {
  const { REACT_APP_KEY } = process.env;
  const apiKey = REACT_APP_KEY;

  // NASA API endpoints
  const publicApi_UrlApod = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const publicApi_UrlMars = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

  // Make a get request to access/view NASA API data
  const responseApod = axios.get(`${publicApi_UrlApod}`, {
    withCredentials: false,
  });

  const responseMars = axios.get(`${publicApi_UrlMars}`, {
    withCredentials: false,
  });

  // react state variables and their functions
  const [apodUrl, setApodUrl] = useState();
  const [apodTitle, setApodTitle] = useState();
  const [apodDate, setApodDate] = useState();
  const [likeBtnApod, setLikeBtnApod] = useState(0);

  const [marsUrl, setMarsUrl] = useState();
  const [marsTitle, setMarsTitle] = useState();
  const [marsDate, setMarsDate] = useState();
  const [likeBtnMars, setLikeBtnMars] = useState(0);

  // retrieve all relevant API data from NASA API
  async function fetchApodData() {
    setApodTitle((await responseApod).data.title);
    setApodUrl((await responseApod).data.url);
    setApodDate((await responseApod).data.date);
  }
  fetchApodData();

  async function fetchMarsData() {
    setMarsTitle((await responseMars).data.photos[0].camera.full_name);
    setMarsUrl((await responseMars).data.photos[0].img_src);
    setMarsDate((await responseMars).data.photos[0].earth_date);
  }
  fetchMarsData();

  // Functions to handle likes
  let handleLikesForApod = () => {
    if (likeBtnApod == 0) {
      return setLikeBtnApod(likeBtnApod + 1);
    } else if (likeBtnApod == 1) {
      return setLikeBtnApod(likeBtnApod - 1);
    }
  };

  let handleLikesForMars = () => {
    if (likeBtnMars == 0) {
      return setLikeBtnMars(likeBtnMars + 1);
    } else if (likeBtnMars == 1) {
      return setLikeBtnMars(likeBtnMars - 1);
    }
  };

  return (
    <div className="flex flex-col flex-wrap content-center ">
      <h1 className="text-center mt-10 mb-10 text-5xl">Spacestagram</h1>

      <div className="mb-16 px-6 lg:px-0">
        <h2 className="text-center md:text-left">{apodTitle}</h2>
        <img src={apodUrl} className="max-w-full lg:max-w-5xl" />
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <button className="" onClick={handleLikesForApod}>
              <HeartIcon className="w-8 stroke-black fill-[#EC5569] stroke-1" />
            </button>
            <span className="ml-4">{likeBtnApod} likes</span>
          </div>
          <p className="">Date of capture: {apodDate}</p>
        </div>
      </div>

      <div className="mb-16 px-6 lg:px-0">
        <h2 className="text-center md:text-left">{marsTitle}</h2>
        <img src={marsUrl} className="max-w-full lg:max-w-5xl" />
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <button className="" onClick={handleLikesForMars}>
              <HeartIcon className="w-8 stroke-black fill-[#EC5569] stroke-1" />
            </button>
            <span className="ml-4">{likeBtnMars} likes</span>
          </div>
          <p className="">Date of capture: {marsDate}</p>
        </div>
      </div>
    </div>
  );
}
