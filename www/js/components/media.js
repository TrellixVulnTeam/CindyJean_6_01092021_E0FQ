export default class Media {
	/**
	 * [constructor description]
	 *
	 * @param   {HTMLElement}  domTarget  [domTarget description]
	 * @param   {Object}  media  [domTarget description]

	 *
	 */
	constructor(domTarget, media, callback = null) {
		this.DOM = document.createElement("article");
		this.DOM.className = "mediaArticle";
		domTarget.appendChild(this.DOM);
		this.title = media.title;
		this.likes = media.likes;
		this.image = media.image;
		this.video = media.video;
		this.videoFrame = "content/media/" + media.video + "#t=0.5";
		this.id = media.id;
		this.photographerId = media.photographerId;
		this.description = media.description;
		this.liked = false;
		this.callback = callback;
		this.medium = media;

		//--- Type of media management
		this.mediaType = media.hasOwnProperty("image") ? "image" : "video";

		//--- Render
		this.render();

	}

	render() {
		this.DOM.innerHTML = `
		<h3>${this.title}</h3> 
		<a href="index.html#lightbox/${this.photographerId}/${this.id}">
		${this.video ? this.addVideo() : this.addImage()}
		</a>`;
		
		const likeButton = document.createElement("button");
		const likes = parseInt(this.likes) + (this.liked ? 1 : 0);
		likeButton.innerHTML = `${likes}<i class="fa${
			this.liked ? "s" : "r"
		} fa-heart"></i>`;
		likeButton.className = "like";
		likeButton.ariaLabel = "likes";
		likeButton.onclick = () => this.addLike();
		this.DOM.appendChild(likeButton);
	};

	addLike() {
		this.liked = !this.liked;
		this.render();
		this.callback(this.liked);
	};

	addVideo() {
		// const video = document.createElement("video");
		// video.setAttribute("preload", "auto");
		// video.innerHTML =`
		// <source src="./content/media/${this.video}" type="video/mp4">
		// 	${this.description}
		// 	</video>
		// 	`;
		return /*HTML*/`
			<video preload="auto" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')"
			aria-label="${this.description}, vidéo agrandie">
			<source src="./content/media/${this.video}" type="video/mp4">
			${this.description}
			</video>
			`;
	};

	addImage() {
		return /*HTML*/`
			<img src="./content/media/${this.image.replace(".", "-small.")}" alt="${this.description}, image agrandie" 
			title="${this.title}" onclick="window.changePage('lightbox','${this.photographerId}','${this.id}')">
		`;
	};
};