
async function loadData(){
  const response = await fetch('data.json');
  const data = await response.json();

  produceCourses(data.courseList);
}

loadData();


function produceCourses(courseList){
  const courseContainer = document.querySelector(".courses-container");

  courseList.forEach((course, index) => {
      const card = document.createElement('div');
      card.classList.add("course-card");
      card.setAttribute('data-course-id', index + 1)
  
      card.innerHTML = `
          <img src="${course.image}" alt="Course 1">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <button class="enroll-btn">Enroll Now</button>
      `
      courseContainer.appendChild(card);
  
      const enrollButton = card.querySelector(".enroll-btn");
      enrollButton.addEventListener("click", () => {
          const courseID = card.getAttribute('data-course-id');
          const courseTitle = course.title;
          const courseImage = course.image;
          const courseDescription = course.description;
  
          const courses = {
              id: courseID,
              title: courseTitle,
              courseImage: courseImage,
              courseDescription: courseDescription
          }
  
          let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
  
          if(!enrolledCourses.find(c => c.id === courseID)){
              enrolledCourses.unshift(courses);
              localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses)); 
              alert(`You have enrolled in Course: ${courseTitle} \nPlease got My Courses/Dashboard to access the course`);
          }else{
              alert(`Course: ${courseTitle} is already enrolled`);
          }
      })
  
  })
}





