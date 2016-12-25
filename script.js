var containerElement = document.getElementById("videoContainer");
appendWrappedYoutubePlayersFromYoutubeIDs(containerElement, getYoutubeIDsFromUrl(window.location.href));

function appendWrappedYoutubePlayersFromYoutubeIDs(element, youtubeIDs) {
	youtubeIDs.forEach(function(youtubeId){
		var wrapperElement = document.createElement("div");
		wrapperElement.setAttribute("class", "youtube-iframe-wrapper");
		wrapperElement.appendChild(generateEmbedElementFromYoutubeId(youtubeId));
		element.appendChild(wrapperElement);
	});
}

function generateEmbedUrlFromYoutubeId(id) {
	return "//www.youtube.com/embed/" + id + "?autoplay=1";
}

function waitForYoutubePlayersToBeReady(playerCount) {
	var i = 1;
	var players = []

	var readyFunction = function(player) {
		players.push(player);
		if (i == playerCount) {
			players.forEach(function(p) {
				p.play();
			})
		}
		i++;
	}
	return function(playerElement) {
		playerElement.addEventListener("onReady", readyFunction)
		return playerElement;
	}
}

function generateEmbedElementFromYoutubeId(id) {
	var iFrameElement = document.createElement("iframe");
	iFrameElement.src = generateEmbedUrlFromYoutubeId(id);
	iFrameElement.width = 420;
	iFrameElement.height = 315;

	return iFrameElement;
}

function getYoutubeIDsFromUrl(url) {
	var decodedUrl = decodeURIComponent(decodeURIComponent(url));
	var matches = [];
	var match;
	var expr = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?(?:.*?)v=|\/)([^\s&]+)/g;
	while (match = expr.exec(decodedUrl)) {
		matches.push(match[1])
	}
	return matches;
}
