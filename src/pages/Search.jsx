import { Error, Loader, SongCard } from '../components';
import { useSelector } from 'react-redux';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map((s) => s.track);

  return isFetching ? (
    <Loader title="Loading top charts" />
  ) : error ? (
    <Error />
  ) : (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((s, i) => (
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

export default Search;
