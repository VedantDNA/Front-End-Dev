
// logout:
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('loggedInUser');
    window.open('index.html', '_self');
})

const defaultUser = {
    user: 'Vedant.A',
    username: 'vedant@gmail.com',
    password: 'vedant1234'
};

const loggedInEmail = localStorage.getItem('loggedInUser');
console.log(loggedInEmail);

const profileNameElement = document.querySelector('.profile-name');
const welcomeMessageElement = document.getElementById('welcome-message');

if (loggedInEmail) {
    const user = localStorage.getItem(loggedInEmail); 
    
    if (user) {
        const parsedUser = JSON.parse(user);
        const username = parsedUser.name;

        profileNameElement.childNodes[0].nodeValue = username; 
        welcomeMessageElement.textContent = `Welcome, ${username}`; 
    } else {
        console.log("User data not found.");
        profileNameElement.childNodes[0].nodeValue = defaultUser.user; 
        welcomeMessageElement.textContent = `Welcome, ${defaultUser.user}`; 
    }
} else {
    console.log("No user is logged in.");
    // Set to default user if no user is logged in
    profileNameElement.childNodes[0].nodeValue = defaultUser.user; 
}


const gateway_dashboard = document.getElementById("gateway_dashboard");
const gateway_inbox = document.getElementById("gateway_inbox");
const gateway_lessons = document.getElementById("gateway_lessons");
const gateway_task = document.getElementById("gateway_task");
const gateway_groups = document.getElementById("gateway_groups");
const image_class = document.getElementsByClassName("friends-image");
const image_background = document.getElementsByClassName("image-background");
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');

// Image Slider Variables:
const track = document.querySelector(".slider_track");
const prevButton = document.querySelector(".prev_button");
const nextButton = document.querySelector(".next_button");


function color_changer(element, newColor) {
    const string = element.innerHTML;
    let fillMatch = string.replace(/fill="([^"]*)"/, `fill="${newColor}"`);
    return fillMatch;
}

function handleMouseOver(element) {
    let newColor = color_changer(element, "#FFEA00");
    element.innerHTML = newColor;
}

function handleMouseOut(element) {
    let resetColor = color_changer(element, "#007BFF");
    element.innerHTML = resetColor;
}

function handleSearchFocus(){
    setTimeout(() => {
        resultsList.style.display = 'block';
        searchInput.style.borderBottomLeftRadius = '0px';
        searchInput.style.borderBottomRightRadius = '0px';
    },100);
}

function handleSearchBlur(){
    setTimeout(() => {
        resultsList.style.display = 'none';
        searchInput.style.borderBottomLeftRadius = '20px';
        searchInput.style.borderBottomRightRadius = '20px';
    }, 200);
}


const dashboardMouseOverListener = () => handleMouseOver(gateway_dashboard);
const dashboardMouseOutListener = () => handleMouseOut(gateway_dashboard);

const inboxMouseOverListener = () => handleMouseOver(gateway_inbox);
const inboxMouseOutListener = () => handleMouseOut(gateway_inbox);

const lessonsMouseOverListener = () => handleMouseOver(gateway_lessons);
const lessonsMouseOutListener = () => handleMouseOut(gateway_lessons);

const taskMouseOverListener = () => handleMouseOver(gateway_task);
const taskMouseOutListener = () => handleMouseOut(gateway_task);

const groupsMouseOverListener = () => handleMouseOver(gateway_groups);
const groupsMouseOutListener = () => handleMouseOut(gateway_groups);


function handleListeners() {

    gateway_dashboard.removeEventListener("mouseover", dashboardMouseOverListener);
    gateway_dashboard.removeEventListener("mouseout", dashboardMouseOutListener);

    gateway_inbox.removeEventListener("mouseover", inboxMouseOverListener);
    gateway_inbox.removeEventListener("mouseout", inboxMouseOutListener);

    gateway_lessons.removeEventListener("mouseover", lessonsMouseOverListener);
    gateway_lessons.removeEventListener("mouseout", lessonsMouseOutListener);

    gateway_task.removeEventListener("mouseover", taskMouseOverListener);
    gateway_task.removeEventListener("mouseout", taskMouseOutListener);

    gateway_groups.removeEventListener("mouseover", groupsMouseOverListener);
    gateway_groups.removeEventListener("mouseout", groupsMouseOutListener);

    gateway_dashboard.addEventListener("mouseover", dashboardMouseOverListener);
    gateway_dashboard.addEventListener("mouseout", dashboardMouseOutListener);

    gateway_inbox.addEventListener("mouseover", inboxMouseOverListener);
    gateway_inbox.addEventListener("mouseout", inboxMouseOutListener);

    gateway_lessons.addEventListener("mouseover", lessonsMouseOverListener);
    gateway_lessons.addEventListener("mouseout", lessonsMouseOutListener);

    gateway_task.addEventListener("mouseover", taskMouseOverListener);
    gateway_task.addEventListener("mouseout", taskMouseOutListener);

    gateway_groups.addEventListener("mouseover", groupsMouseOverListener);
    gateway_groups.addEventListener("mouseout", groupsMouseOutListener);
}

const searchFocus = () => handleSearchFocus();
const searchBlur = () => handleSearchBlur();

function displayResults(){
    searchInput.removeEventListener("focus", searchFocus);
    searchInput.removeEventListener("blur", searchBlur);

    searchInput.addEventListener("focus", searchFocus);
    searchInput.addEventListener("blur", searchBlur);
}


async function loadData(){
    try{
        const response = await fetch('data.json');
        const data = await response.json();

        produceRecommendedCourses(data.recommendedCourseCatalogue);
        displayMentor(data.mentors);
        createContinueWatchingSlider(data.continueWatching);
        videoCatalogue = data.videoCatalogue;

    }catch(error){
        console.error("Error Loading Data", error);
    }
}

// Function to handle course search
function searchCourses(searchTerm) {
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = ""; // Clear previous results

    if (searchTerm.length === 0) {
        resultsList.style.display = "none"; // Hide results if search term is empty
        return;
    }

    const filteredCourses = videoCatalogue.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredCourses.length === 0) {
        resultsList.style.display = "none"; // Hide results if no matches
    } else {
        resultsList.style.display = "block"; // Show results

        filteredCourses.forEach(course => {
            const listItem = document.createElement("li");
            listItem.textContent = course.title;
            listItem.onclick = () => {
                window.open(`Video.html?id=${course.id}`, "_self"); // Navigate to video page
            };
            resultsList.appendChild(listItem);
        });
    }
}

// Event listener for the search input
document.getElementById("search-input").addEventListener("input", function() {
    const searchTerm = this.value.trim();
    searchCourses(searchTerm);
});


function produceRecommendedCourses(recommendedCourse){
    recommendedCourse.forEach((course,index) => {
        let courseID = course.courseID;
        let courseName = course.courseName;
        let courseIMG = course.courseIMG;
        let courseBanner = document.createElement("li");
        courseBanner.classList.add("slide_item");
        courseBanner.classList.add("current-slide");
        courseBanner.setAttribute('data-course-id', index + 1)

        courseBanner.innerHTML = `
        <div class="course-banner" style="background-image: url(${courseIMG});">
            <span class="recommended_course">Recommended Course</span>
            <div class="course-title">
                <span>${courseName}</span>
                <button class=join-course-style data-course-id = "" >Join Course <span><img src="assets/arrow_forward_ios_24dp_000000_FILL0_wght500_GRAD0_opsz24.svg" alt="arrow"></span></button>
            </div>
        </div>
        `;
        courseBanner.addEventListener("click", () => {
            window.open(`Video.html?id=${courseID}`,"_self");
        })

        track.appendChild(courseBanner);

        const joinBtn = courseBanner.querySelector('.join-course-style');
        joinBtn.addEventListener("click", () => {
            courseID = courseBanner.getAttribute('data-course-id');
            courseTitle = courseName;

            const courses = {
                id: courseID,
                title: courseTitle
            }

            let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
            if(!enrolledCourses.find((c) => c.id === courseID)){
                enrolledCourses.push(courses);
                localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
                alert(`You have enrolled in Course: ${courseTitle}`);
            }else{
                alert(`Course: ${courseTitle} is already enrolled`);
            }
        })
        
    });
}

loadData().then(()=>{
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    // function to position the slide:
    function setSlidePosition(slide,index){slide.style.left = `${slideWidth * index}px`;}
    slides.forEach(setSlidePosition);

    // function to execute switching of slide items:
    function moveSlide(track,currentSlide,targetSlide ){
        if(!targetSlide)return;
        const amountToMove = targetSlide.style.left;
        track.style.transform = `translateX(-${amountToMove})`;
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");
    }

    // function to auto cycle slides;
    function autoCycleSlide(){
        const currentSlide = track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling || slides[0];

        moveSlide(track, currentSlide, nextSlide);
    }


    const handleNextSlide = () => {
        const currentSlide = track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;

        moveSlide(track,currentSlide,nextSlide);
        clearInterval(slideInterval);
    }

    const handlePrevSlide = () => {
        const currentSlide = track.querySelector(".current-slide");
        const prevSlide = currentSlide.previousElementSibling;

        moveSlide(track,currentSlide,prevSlide);
        clearInterval(slideInterval);
    }


    let slideInterval = setInterval(autoCycleSlide,5000);
    const handleAutoSlide_interrupt = () => slideInterval = setInterval(autoCycleSlide,5000);
    const handleAutoSlide_stop = () => clearInterval(slideInterval);

    function handleButtons(){
        nextButton.removeEventListener("click", handleNextSlide);
        nextButton.addEventListener("click", handleNextSlide);

        track.removeEventListener("mouseover", handleAutoSlide_stop);
        track.addEventListener("mouseover", handleAutoSlide_stop);

        track.removeEventListener("mouseout", handleAutoSlide_interrupt);
        track.addEventListener("mouseout", handleAutoSlide_interrupt);

        prevButton.removeEventListener("click", handlePrevSlide);
        prevButton.addEventListener("click", handlePrevSlide);
    }

    handleListeners();
    displayResults();
    handleButtons();
    
});



// continue watching slider:

function createContinueWatchingSlider(continueWatchingData) {
    const continueWatchingTrack = document.querySelector(".hist-slider");

    let idCounter = 17;

    continueWatchingData.forEach(item => {
        const histItem = document.createElement("li");
        histItem.className = "hist-item";
        
        const card = document.createElement("div");
        card.className = "card";
        card.style.backgroundImage = `url(${item.image})`;
        const courseID = idCounter;

        card.setAttribute('id', idCounter++);

        card.addEventListener('click', () => {
            window.open(`Video.html?id=${courseID}`, "_self");
        });

        const histTitle = document.createElement("div");
        histTitle.className = "hist-title";
        histTitle.innerHTML = `
            <img src="assets/play_circle_24dp_FFFFFF_FILL0_wght500_GRAD0_opsz24.svg" width="30px">
            <span>${item.title}</span>
        `;

        card.appendChild(histTitle);
        
        histItem.appendChild(card);
        
        continueWatchingTrack.appendChild(histItem);
    });

    const histBtn_prev = document.querySelector(".hist-btn-prev");
    const histBtn_next = document.querySelector(".hist-btn-next");
    let currentPosition = 0;

    function histMoveSlider(direction) {
        const totalItems = document.querySelectorAll('.hist-item').length;
        const itemsPerView = 2; 
        const maxPosition = Math.floor(totalItems / itemsPerView) - 1;

        if (direction === 'next' && currentPosition < maxPosition) {
            currentPosition++;
        } else if (direction === 'prev' && currentPosition > 0) {
            currentPosition--;
        }

        continueWatchingTrack.style.transform = `translateX(-${currentPosition * (100 / itemsPerView)}%)`;
    }

    histBtn_prev.addEventListener("click", () => histMoveSlider('prev'));
    histBtn_next.addEventListener("click", () => histMoveSlider('next'));
}




function displayMentor(mentors){
    const mentorContainer = document.querySelector(".mentor");

    mentors.forEach((mentor) => {
        const mentorDetails = document.createElement("div");
        mentorDetails.classList.add("mentor-account");

        mentorDetails.innerHTML = `
            <div class="mentor-name">
                <span><img src="${mentor.profile}" width="25px"></span>
                <a href="#" class="">${mentor.name}</a>
            </div>
            <span class="mentor-experience">${generateRatings(mentor.rating)}</span>
            <span class="mentor-experience">${mentor.country}</span>
            <span class="subject">${mentor.category}</span>
        `;
        mentorContainer.appendChild(mentorDetails);
    })
}

function generateRatings(rating){
    const maxRating = 5;
    let currRating = '';

    for(let i = 0; i <= maxRating; i++){
        if(i <= rating){
            currRating += '<span style="font-size:100%;color:rgb(0, 38, 255);">&starf;</span>';
        }else{
            currRating += '<span style="font-size:100%;color:rgb(0, 38, 255);">&star;</span>';
        }
    }
    return currRating;
}


function displayMyCourses(){
    const courseContainer = document.querySelector(".course-list");
    let myCourses = JSON.parse(localStorage.getItem('enrolledCourses'));

    if(myCourses){
        myCourses.slice(0,7).forEach((course) => {
            const newCourse = document.createElement("div");
            newCourse.classList.add("course");
            newCourse.setAttribute('data-course-id', course.id);
    
            newCourse.innerHTML = `
                <img src="${course.courseImage}">
                <h2 class="course-name">${course.title}</h2>
            `;
    
            newCourse.addEventListener("click", () => {
                window.open(`Video.html?id=${course.id}`,"_self");
            })
    
            courseContainer.appendChild(newCourse);
        })
    }else{
        const error = document.createElement("div");
        error.classList.add('error');
        error.innerHTML = "No Courses Enrolled Yet.<br><br> <p>Go to <a href = 'courses.html'>All Courses</a> and enroll.<p>";
        courseContainer.appendChild(error);
    }
}

displayMyCourses();






