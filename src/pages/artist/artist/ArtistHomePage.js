import CountUp from "react-countup";
import React from "react";
import { useSelector } from "react-redux";

const ArtistHomePage = () => {
  const infoArtist = useSelector((state) => state.auth.login.currentUser);
  const totalFollowers = infoArtist?.followers;
  const totalRevenue = infoArtist?.revenue;
  const totalLikes = infoArtist?.totalLikes;
  const totalListens = infoArtist?.totalListens;
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="w-full h-[220px]   items-center justify-center flex m-auto bg-white">
          <div className="flex items-center justify-center w-1/3 h-full bg-red-500 rounded-md">
            <span className="flex items-center justify-center w-40 h-40 p-10 border-4 border-dotted rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="64"
                viewBox="0 0 640 512"
              >
                <path
                  fill="white"
                  d="M48 48h88c13.3 0 24-10.7 24-24S149.3 0 136 0H32C14.3 0 0 14.3 0 32v104c0 13.3 10.7 24 24 24s24-10.7 24-24V48zm127.8 176a48 48 0 1 0 0-96a48 48 0 1 0 0 96zm-26.5 32c-29.4 0-53.3 23.9-53.3 53.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4h-69.4zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3h-69.4c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zm-89.4 0c-8.6-24.3-29.9-42.6-55.9-47c-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24zM464 224a48 48 0 1 0 0-96a48 48 0 1 0 0 96zm-80-32a64 64 0 1 0-128 0a64 64 0 1 0 128 0zM504 48h88v88c0 13.3 10.7 24 24 24s24-10.7 24-24V32c0-17.7-14.3-32-32-32H504c-13.3 0-24 10.7-24 24s10.7 24 24 24zM48 464v-88c0-13.3-10.7-24-24-24S0 362.7 0 376v104c0 17.7 14.3 32 32 32h104c13.3 0 24-10.7 24-24s-10.7-24-24-24H48zm456 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h104c17.7 0 32-14.3 32-32V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v88h-88z"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 text-6xl font-bold text-red-500 font-secondary">
            <CountUp duration={2.75} end={totalFollowers} />
            <p className="text-2xl font-normal">followers</p>
          </div>
        </div>
        <div className="w-full h-[220px]   items-center justify-center flex m-auto bg-white">
          <div className="flex items-center justify-center w-1/3 h-full bg-green-600 rounded-md">
            <span className="flex items-center justify-center w-40 h-40 p-10 border-4 border-dotted rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={81}
                height={72}
                viewBox="0 0 576 512"
              >
                <path
                  fill="white"
                  d="M0 112.5v309.8c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3c-87-32.5-174-10.3-261 11.9c-79.8 20.3-159.6 40.6-239.3 18.8C25.6 72.8 0 88.6 0 112.5zM128 416H64v-64c35.3 0 64 28.7 64 64zM64 224v-64h64c0 35.3-28.7 64-64 64zm384 128c0-35.3 28.7-64 64-64v64h-64zm64-192c-35.3 0-64-28.7-64-64h64v64zm-128 96c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zm-132-48c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h48c11 0 20-9 20-20s-9-20-20-20h-4v-68c0-11-9-20-20-20h-16c-11 0-20 9-20 20z"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 text-6xl font-bold text-green-600 font-secondary">
            <div className="flex gap-2">
              <CountUp duration={2.75} end={totalRevenue} decimals={2} />$
            </div>
            <p className="text-2xl font-normal">revenue</p>
          </div>
        </div>
        <div className="w-full h-[220px]   items-center justify-center flex m-auto bg-white">
          <div className="flex items-center justify-center w-1/3 h-full bg-blue-500 rounded-md">
            <span className="flex items-center justify-center w-40 h-40 p-10 border-4 border-dotted rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2h144c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48h-97.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192h64c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 text-6xl font-bold text-blue-500 font-secondary">
            <CountUp duration={2.75} end={totalLikes} />
            <p className="text-2xl font-normal">likes</p>
          </div>
        </div>
        <div className="w-full h-[220px]   items-center justify-center flex m-auto bg-white">
          <div className="flex items-center justify-center w-1/3 h-full rounded-md bg-primary">
            <span className="flex items-center justify-center w-40 h-40 p-10 border-4 border-dotted rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={82}
                height={82}
                viewBox="0 0 28 28"
              >
                <path
                  fill="white"
                  d="M26 22a4 4 0 0 1-4 4h-3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h5v-2c0-5.523-4.477-10-10-10S4 8.477 4 14v2h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a4 4 0 0 1-4-4v-8C2 7.373 7.373 2 14 2s12 5.373 12 12v8Z"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 text-6xl font-bold text-primary font-secondary">
            <CountUp duration={2.75} end={totalListens} />
            <p className="text-2xl font-normal">listens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHomePage;
