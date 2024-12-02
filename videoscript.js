
async function loadData(){
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data.videoCatalogue);

    displayVideo(data.videoCatalogue);
    displayRelatedVideos(data.videoCatalogue);
}

loadData();

function displayVideo(videoCatalogue){
    const videoURL = new URLSearchParams(window.location.search);
    const videoID = videoURL.get('id');
    const videoIndex = parseInt(videoID, 10);
    const videoPlayer = document.querySelector("#videoPlayer");
    const errorMessage = document.querySelector("#errorMessage");
    const videoTitle = document.querySelector(".videoTitle");
    const videoDescription = document.querySelector(".video-description");
    
    if (videoID !== null && videoIndex >= 1) {
        const videoDetails = videoCatalogue.find(value => value.id === videoIndex);
    
        if (videoDetails) {
            videoPlayer.innerHTML = `<source src="${videoDetails.link}" type="video/mp4">`;
            videoTitle.textContent = videoDetails.title;
            videoDescription.textContent = videoDetails.description; 
            errorMessage.style.display = 'none';
        } else {
            videoPlayer.style.display = 'none';  
            errorMessage.style.display = 'flex'; 
        }
    } else {
        videoPlayer.style.display = 'none'; 
        errorMessage.style.display = 'flex';
    }
}

function displayRelatedVideos(videoCatalogue) {
    const videoList = document.querySelector(".videoList");
    const videoURL = new URLSearchParams(window.location.search);
    const videoID = videoURL.get('id');
    const videoIndex = parseInt(videoID, 10);

    const relatedVideos = videoCatalogue.filter(video => video.id !== videoIndex); // Exclude current video
    videoList.innerHTML = ''; 
    
    relatedVideos.forEach(video => {
        const videoItem = document.createElement("div");
        videoItem.classList.add("related-video");
        videoItem.innerHTML = `
            <img src="${video.image}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <a href="video.html?id=${video.id}">Watch Now</a>
        `;
        videoList.appendChild(videoItem);
    });
}

