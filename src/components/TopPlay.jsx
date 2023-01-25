import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i }) => (
  <div className="flex flex-row items-center w-full hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {song.title}
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  // scrolls to top of page every time its loaded
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  // gets top 5 songs
  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="flex-1 mb-6 ml-0 xl:ml-6 xl:mb-0 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="flex flex-col w-full"></div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Top Charts</h2>
        <Link to="/top-charts">
          <p className="text-base text-gray-300 cursor-pointer">See more</p>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        {topPlays?.map((song, i) => (
          <TopChartCard key={song.key} song={song} i={i} />
        ))}
      </div>
      <div></div>
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          module={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="rounded-full shadow-lg animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="object-cover w-full rounded-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
