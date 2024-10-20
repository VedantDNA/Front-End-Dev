
function produceMyCourses(){
    const courseContainer = document.querySelector(".courses-container");
    const error = document.querySelector(".error");
    let myCourses = JSON.parse(localStorage.getItem('enrolledCourses'));

    if(myCourses && myCourses.length>0){
        error.style.display = 'none';
        const courseList = Array.from(myCourses);
        courseList.forEach((course,index) => {
        const card = document.createElement('div');
        card.classList.add("course-card");
        card.setAttribute('data-course-id', index + 1)
  
        card.innerHTML = `
            <img src="${course.courseImage}" alt="Course 1">
            <h3>${course.title}</h3>
            <p>${course.courseDescription}</p>
            <button class="enroll-btn">Play</button>
        `
        courseContainer.appendChild(card);

        const playButton = card.querySelector(".enroll-btn");
        playButton.addEventListener("click", () => {
            window.open(`Video.html?id=${course.id}`,"_self");
        })
        })
    }else{
        courseContainer.style.display = 'none';
        error.style.display = "flex";
    }
}

produceMyCourses();