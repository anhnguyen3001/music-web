import { Song } from "app/models/Song";

export const PLAY = 'PLAY';
export const SKIP = 'SKIP';
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const REPEAT = 'REPEAT';
export const SHUFFLE = 'SHUFFLE';
export const COUNTER = 'COUNTER';
export const RESTART = 'RESTART';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const PLAY_CHOSEN_SONG = 'PLAY_CHOSEN_SONG';

export const playMusic = (songs: Array<Song>) => {
    return {
        type: PLAY,
        payload: songs,
    };
};

export const skipMusic = (pos: number) => {
    return {
        type: SKIP,
        payload: pos,
    };
};

export const addSong = (songs: Array<Song>) => {
    return {
        type: ADD_SONG,
        payload: songs,
    };
};

export const removeSong = (song: Song) => {
    return {
        type: REMOVE_SONG,
        payload: song,
    };
};

export const repeat = () => {
    return {
        type: REPEAT,
    };
};

export const shuffle = (isShuffle: boolean) => {
    return {
        type: SHUFFLE,
        payload: isShuffle,
    };
};

export const counter = (music_id: number) => {
    return {
        type: COUNTER,
        payload: music_id,
    };
};

export const restart = () => {
    return {
        type: RESTART,
    };
};

export const togglePlayMusic = () => {
    return {
        type: TOGGLE_PLAY,
    };
};

export const playChosenSong = (index: number) => {
    return {
        type: PLAY_CHOSEN_SONG,
        payload: index,
    };
};
