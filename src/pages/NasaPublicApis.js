import React from "react";
import axios from "axios";
import { useState } from "react";
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
  const [apodlikeText, setApodLikeText] = useState("likes");
  const [apodUrl, setApodUrl] = useState();
  const [apodTitle, setApodTitle] = useState();
  const [apodDate, setApodDate] = useState();
  const [likeBtnApod, setLikeBtnApod] = useState(0);
  const [apodColor, setApodColor] = useState(false);

  const [marslikeText, setMarsLikeText] = useState("likes");
  const [marsUrl, setMarsUrl] = useState();
  const [marsTitle, setMarsTitle] = useState();
  const [marsDate, setMarsDate] = useState();
  const [likeBtnMars, setLikeBtnMars] = useState(0);
  const [marsColor, setMarsColor] = useState(false);

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
      setLikeBtnApod(likeBtnApod + 1);
      setApodLikeText("like");
      setApodColor(true);
    } else if (likeBtnApod == 1) {
      setLikeBtnApod(likeBtnApod - 1);
      setApodLikeText("likes");
      setApodColor(false);
    }
  };

  let handleLikesForMars = () => {
    if (likeBtnMars == 0) {
      setLikeBtnMars(likeBtnMars + 1);
      setMarsLikeText("like");
      setMarsColor(true);
    } else if (likeBtnMars == 1) {
      setLikeBtnMars(likeBtnMars - 1);
      setMarsLikeText("likes");
      setMarsColor(false);
    }
  };

  return (
    <div className="flex flex-col flex-wrap content-center bg-gray-300">
      <h1 className="text-center mt-10 mb-10 text-5xl font-['Lobster-Regular'] italic">
        Spacestagram
      </h1>

      <div className="mb-16 px-6 lg:px-0">
        <h2 className="text-center md:text-left text-2xl">{apodTitle}</h2>
        <img src={apodUrl} className="max-w-full lg:max-w-5xl" />
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <button className="" onClick={handleLikesForApod}>
              <HeartIcon
                className={`w-8 stroke-black active:fill-dark-alert stroke-1 ${
                  apodColor
                    ? "fill-light-alert"
                    : "fill-light-white stroke-gray-dark"
                }`}
              />
            </button>
            <span className="ml-4">
              {likeBtnApod} {apodlikeText}
            </span>
          </div>
          <p className="">Date of capture: {apodDate}</p>
        </div>
      </div>

      <div className="mb-16 px-6 lg:px-0">
        <h2 className="text-center md:text-left text-2xl">{marsTitle}</h2>
        <img src={marsUrl} className="max-w-full lg:max-w-5xl" />
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <button className="" onClick={handleLikesForMars}>
              <HeartIcon
                className={`w-8 stroke-black active:fill-dark-alert stroke-1 ${
                  marsColor
                    ? "fill-light-alert"
                    : "fill-light-white stroke-gray-dark"
                }`}
              />
            </button>
            <span className="ml-4">
              {likeBtnMars} {marslikeText}
            </span>
          </div>
          <p className="">Date of capture: {marsDate}</p>
        </div>
      </div>
    </div>
  );
}
