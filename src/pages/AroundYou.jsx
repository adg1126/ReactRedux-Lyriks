import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Error, Loader, SongCard } from '../components';
import { useSelector } from 'react-redux';
import { useGetSongsbyCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsbyCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_jESzQGBIEjoPSEiUvQkKi67JcdWS3`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return isFetching && loading ? (
    <Loader title="Loading songs around you" />
  ) : error && country ? (
    <Error />
  ) : (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left">
        Around You In <span className="text-gray-400">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((s, i) => (
          <SongCard
            key={s.key}
            song={s}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
