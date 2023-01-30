import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setloading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios.get(
      `https://geo.ipify.org/api/v2/country?apiKey=at_pwx7TfmU9cYUnH6sulnaqBiuDFiWL`
    );
  }, [country]);

  return <div></div>;
};

export default AroundYou;
