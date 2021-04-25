import {
	PLAY,
	SKIP,
	REMOVE_SONG,
	RESTART,
	TOGGLE_PLAY,
	PLAY_CHOSEN_SONG,
	SHUFFLE,
	ADD_SONG,
} from './actions';
import {Action} from '../../../models/redux/action';
import { Song } from 'app/models/Song';
  
const initialState = {
	isPlaying: false,
	songs: [],
	songIndex: -1,
};
  
export const playerReducer = (state: any = initialState, action: Action) => {
	let {songs} = state;
	switch (action.type) {
		case PLAY:
			return {
			...state,
			isPlaying: true,
			songIndex: 0,
			songs: action.payload,
			};
		case TOGGLE_PLAY:
			return {
				...state,
				isPlaying: !state.isPlaying,
			};
		case SKIP: {
			let { songIndex } = state;
			let newIndex = action.payload + songIndex;

			if (newIndex < 0) {
				newIndex = songs.length - 1;
			} else if (newIndex >= songs.length) {
				newIndex = 0;
			}
	
			return {
				...state,
				songIndex: newIndex,
				isPlaying: true,
			};
		}
		case REMOVE_SONG: {
			let removeSong = action.payload;
			let {isPlaying} = state;
	
			songs = songs.filter((song: Song) => removeSong.track_id !== song.track_id);
			if (!songs.length) {
			isPlaying = false;
			}
	
			return {
				...state,
				songs: [...songs],
				isPlaying,
			};
		}
		case RESTART:
			return {
				...state,
				songIndex: 0,
				isPlaying: true,
			};
		case PLAY_CHOSEN_SONG:
			let newState = {
				...state,
				songIndex: action.payload,
			};
			
			if (!state.isPlaying) {
				return {
					...newState,
					isPlaying: true,
				};
			}
	
			return {...newState};
		case SHUFFLE: {
			if (action.payload) {
				for (let i = songs.length - 1; i > 0; i--) {
					// Generate random number
					let j = Math.floor(Math.random() * (i + 1));
			
					let temp = songs[i];
					songs[i] = songs[j];
					songs[j] = temp;
				}
			} else {
				songs.sort((a: Song, b: Song) => a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0));
			}
			
			return {
				...state,
				songs: [...songs],
				songIndex: 0,
				isPlaying: true,
			};
		}
		case ADD_SONG: 
			return {
				...state,
				songs: [...state.songs, ...action.payload],
			};
		default:
			return state;
	}
  };
  