import { Song } from "app/models/Song";
import { addSong, playMusic, togglePlayMusic } from "app/redux/modules/player";
import store from 'app/redux';

export const playSong = async (newSongs: Array<Song>) => {
    let { player } = store.getState();
    let { songs, isPlaying, songIndex } = player;

    if ((newSongs.length === 1 && songs.length && newSongs[0].track_id === songs[songIndex].track_id && isPlaying)) {
        store.dispatch(togglePlayMusic());
    } else {
        store.dispatch(playMusic(newSongs));
    }
};

export const addNewSong = async (songs: Array<Song>) => {
    store.dispatch(addSong(songs));
}
