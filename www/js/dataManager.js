/**
 * @typedef {Object} photographerProfile
 * @property   {String}  portrait  url of the profile photo
 * @property   {String}  name  name of the photographer
 * @property   {String}  city  address city
 * @property   {String}  country  address country
 * @property   {String}  tagline  tagline of the photographer
 * @property   {Array}  tags  tags of the photographer
 * @property   {Array}  price  price
 * @property   {Number}  id photographer id
 * @property	 {String}	 description photo description
 */

/**
 * @typedef  {Object}  media
 * @property   {Number}  id  media id
 * @property   {Number}  photographerId  
 * @property   {String}  title  
 * @property   {String}  image  
 * @property   {Array}  tags  
 * @property   {Number}  likes  
 * @property   {String}  video  
 * @property   {String}  date  
 * @property   {Number}  price  
 * @property	 {String}	 description
 */

/**
 * @typedef  {null | Object}  allData
 * @property {Array.<photographerProfile>}  photographers
 * @property {Array.<media>}   media
 */

let data, src;

function init(source) {
	/**
	 * initializes the data
	 *
	 * @type {allData}
	 */
	data = null;
	src = source;
}

async function getAllData() {
	const response = await fetch(src);
	data = await response.json();
}

async function getPhotographersTags() {
	if (data === null) await getAllData();
	let tags = [];
	data.photographers.forEach((photographer) => {
		tags = tags.concat(photographer.tags);
	});
	return [...new Set(tags)];
}

/**
 * [getPhotographersList description]
 *
 * @param   {Array}  filters  [filters description]
 *
 * @return  {Promise.<Array.<photographerProfile>>}           [return description]
 */
async function getPhotographersList(filters) {
	if (data === null) await getAllData();
	if (filters.length === 0) return data.photographers;
	let photographers = [];
	data.photographers.forEach((photographer) => {
		filters.forEach((filter) => {
			if (photographer.tags.indexOf(filter) !== -1)
				photographers.push(photographer);
		});
	});
	return [...new Set(photographers)];
}

async function getPhotographerById(id) {
	if (data === null) await getAllData();
	for (const photographer of data.photographers) {
		if (photographer.id === id) return photographer;
	}
}

async function getMediaByPhotographerId(id) {
	if (data === null) await getAllData();
	let media = [];
	console.log(typeof id)
	data.media.forEach((medium) => {
		if (medium.photographerId === id) media.push(medium);
	});
	console.log(media,"...")
	return media;
}

export {
	init,
	getPhotographersTags,
	getPhotographersList,
	getPhotographerById,
	getMediaByPhotographerId,
};
