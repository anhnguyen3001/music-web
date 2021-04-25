import { API } from './index';
import { RESOURCE_URL, EXPLORE } from 'app/constants/api';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';

export const fetchExplore = () => {
	const query = `
		query {
			latestSongs(first: ${DEFAULT_PAGE_SIZE} offset: 0) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			latestAlbums(first: ${DEFAULT_PAGE_SIZE} offset: 0) {
				album_id
				title
				release_date
				image
				singers
			}
			genres {
				genre_id
				name
				image
			}
			kpop: chart(area: KPOP) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			vpop: chart(area: VPOP) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			usuk: chart(area: USUK) {
				track_id
				title
				url
				image
				singers
				lyric
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchAllChart = () => {
	const query = `
		query {
			kpop: chart(area: KPOP) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			vpop: chart(area: VPOP) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			usuk: chart(area: USUK) {
				track_id
				title
				url
				image
				singers
				lyric
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
}

export const fetchAlbumDetail = (album_id: number) => {
	const query = `
		query {
			album: getAlbumByID (album_id: ${album_id}) {
				image
				singers
			}
			songs: tracksByAlbum (album_id: ${album_id}) {
				track_id
				title
				url
				image
				singers
				lyric
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
}

export const fetchSongsByAlbumId = (album_id: number) => {
	const query = `
		query {
			songs: tracksByAlbum (album_id: ${album_id}) {
				track_id
				title
				url
				image
				singers
				lyric
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchAblumByGenre = (
	genre_id: number,
	first?: number,
	offset?: number,
	) => {
	if (!first) first = DEFAULT_PAGE_SIZE;
	if (!offset) offset = 0;

	const query = `
		query {
			albums: albumsByGenre(first: ${first} offset: ${offset} genre_id: ${genre_id}) {
				album_id
				title
				release_date
				image
				singers
			}
		}
  	`;

  	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchSongByGenre = (
	genre_id: number,
	first?: number,
	offset?: number,
) => {
	if (!first) first = DEFAULT_PAGE_SIZE;
	if (!offset) offset = 0;

	const query = `
		query {
			songs: tracksByGenre (first: ${first} offset: ${offset} genre_id: ${genre_id}) {
				track_id
				title
				url
				image
				singers
				lyric
			}
		}
	`;

  	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchGenreDetail = (genre_id: number) => {
	const query = `
		query {
			songs: tracksByGenre (first: ${DEFAULT_PAGE_SIZE - 1} offset: 0 genre_id: ${genre_id}) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			albums: albumsByGenre(first: ${DEFAULT_PAGE_SIZE - 1} offset: 0 genre_id: ${genre_id}) {
				album_id
				title
				release_date
				image
        		singers
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const postSongCounter = (track_id: number) => {
	const mutation = `
		mutation {
			status: trackCounter(track_id: ${track_id})
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, mutation);
};

export const fetchGenres = (first?: number, offset?: number) => {
	const limit = first ? `(first: ${first} offset: ${offset})` : '';
	
	const query = `
		query {
			genres ${limit}{
				genre_id
				name
				image
			}
		}  
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchSearchResult = (keyword: string) => {
	const query = `
		query {
			songs: searchByTrack(keyword: "${keyword}") {
				track_id
				title
				url
				image
				singers
				lyric
			}
			artists: searchBySinger(keyword: "${keyword}") {
				singer_id
				name
				description
				image
			}
			albums: searchByAlbum(keyword: "${keyword}") {
				album_id
				title
				release_date
				image
				singers
			}
		}  
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchArtistDetail = (singer_id: number) => {
	const query = `
		query {
			singer: getSingerByID(singer_id: ${singer_id}) {
				image
			}
			artistSongs: tracksBySinger(singer_id: ${singer_id}) {
				track_id
				title
				url
				image
				singers
				lyric
			}
			artistAlbums: albumsBySinger(singer_id: ${singer_id}) {
				album_id
				title
				release_date
				image
				singers
			}
		}
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchSingers = async (first: number, offset: number) => {
	const query = `
		query {
			singers: getSingers(first: ${first} offset: ${offset}) {
				singer_id
				name
				image
				description
				totalSong
        		totalAlbum
			}
		}  
	`;

	return API.graphql(RESOURCE_URL + EXPLORE, query);
}
