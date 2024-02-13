(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



const handleLogout = () => {
    const token = localStorage.getItem('token');
    fetch("http://127.0.0.1:8000/logout/",{
        method: "POST",
        headers : {
            "Authorization":`Token ${token}`,
            "content-type": "application/json",

        }
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem(`enrolled_course_${courseId}`);
        sessionStorage.removeItem(`enrolled_course_${courseId}`);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_id");
    })
    
}



const course_container = document.getElementById('courseContainer');
const Purchased_Container = document.getElementById('PurchasedContainer');
const userId = localStorage.getItem("user_id");



const login_button = document.getElementById('login_button');
const purchase_button = document.getElementById('purchase_button');
if (userId) {
    login_button.innerText = "Logout";
    purchase_button.style.display = "none";
    login_button.addEventListener('click', handleLogout);
}




fetch(`http://127.0.0.1:8000/enroll/?student=${userId}`)
    .then(res => res.json())
    .then(enrollments => {
        const enrolledCourseIds = enrollments.map(enrollment => enrollment.course);
        fetch('http://127.0.0.1:8000/course/')
            .then(res => res.json())
            .then(data => {
                const purchasedCourses = data.filter(course => enrolledCourseIds.includes(course.id));
                purchasedCourses.forEach(course => {
                    const couseItem = document.createElement('div');
                    couseItem.classList.add("col-lg-4", "col-md-6", "wow", "fadeInUp")
                    couseItem.setAttribute('data-wow-delay', '0.1s');
                    couseItem.innerHTML = `
                    <a href="detail.html?id=${course.id}">
                        <div class="course-item bg-light">
                            <div class="position-relative overflow-hidden">
                                <img class="img-fluid" src="${course.image}" alt="${course.name}">
                                <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    <a href="#" class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                                    <a href="#" class="flex-shrink-0 btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Join Now</a>
                                </div>
                            </div>
                            <div class="text-center p-4 pb-0">
                                
                                <div class="mb-3">
                                    ${(course.ratings)}
                                    <small>(123)</small>
                                </div>
                                <h4 class="mb-4">${course.name}</h4>
                            </div>
                            <div class="d-flex border-top">
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-user-tie text-primary me-2"></i>${course.instructor}</small>
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-clock text-primary me-2"></i>${course.duration}hr</small>
                                <small class="flex-fill text-center py-2"><i class="fa fa-user text-primary me-2"></i>30 Students</small>
                            </div>
                        </div>
                    </a>`;

                    Purchased_Container.appendChild(couseItem);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    })
    .catch(error => console.error('Error fetching enrollments:', error));


fetch('http://127.0.0.1:8000/course/')
.then(res=>res.json())
.then(data=>{
    data.forEach(course=>{
        const couseItem = document.createElement('div');
        couseItem.classList.add("col-lg-4", "col-md-6","wow" ,"fadeInUp" )
        couseItem.setAttribute('data-wow-delay','0.1s');
        couseItem.innerHTML = `
        <a href="detail.html?id=${course.id}">
        <div class="course-item bg-light">
        <div class="position-relative overflow-hidden">
            <img class="img-fluid" src="${course.image}" alt="${course.name}">
            <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <a href="#" class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                <a href="#" class="flex-shrink-0 btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Join Now</a>
            </div>
        </div>
        <div class="text-center p-4 pb-0">
            <h3 class="mb-0">${course.fee}</h3>
            <div class="mb-3">
                ${(course.ratings)}
                <small>(123)</small>
            </div>
            <h5 class="mb-4">${course.name}</h5>
        </div>
        <div class="d-flex border-top">
            <small class="flex-fill text-center border-end py-2"><i class="fa fa-user-tie text-primary me-2"></i>${course.instructor}</small>
            <small class="flex-fill text-center border-end py-2"><i class="fa fa-clock text-primary me-2"></i>${course.duration}hr</small>
            <small class="flex-fill text-center py-2"><i class="fa fa-user text-primary me-2"></i>30 Students</small>
        </div>
    </div>
     </a>`
   ;

    course_container.appendChild(couseItem);
    
    })
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const courseId = getParameterByName('id');
const detailsCourse = document.getElementById('details_course');

fetch(`http://127.0.0.1:8000/course/${courseId}/`)
    .then(res => res.json())
    .then(course => {


        detailsCourse.querySelector('h1').innerText = course.name;
        detailsCourse.querySelector('img').src = course.image;
        detailsCourse.querySelector('p').innerText = course.description;
        detailsCourse.querySelector('h1').classList.add('display-4');
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
    });



    const courseFeaturesContainer = document.getElementById('feature');
    
    const isEnrolled = (courseId) => {
        const enrollmentStatus = localStorage.getItem(`enrolled_course_${courseId}`);
        return enrollmentStatus === "true";
    };

fetch(`http://127.0.0.1:8000/course/${courseId}/`)
        .then(res => res.json())
        .then(course => {
            
            courseFeaturesContainer.innerHTML = `
                <h3 class="text-white py-3 px-4 m-0">Course Features</h3>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Instructor</h6>
                    <h6 class="text-white my-3">${course.instructor}</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Rating</h6>
                    <h6 class="text-white my-3">${course.ratings} (${course.ratings.length})</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Instructor</h6>
                    <h6 class="text-white my-3">${course.instructor} </h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Duration</h6>
                    <h6 class="text-white my-3">${course.duration} hr.</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Lecture</h6>
                    <h6 class="text-white my-3">${course.lectures}</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Skill level</h6>
                    <h6 class="text-white my-3">All Level</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                    <h6 class="text-white my-3">Language</h6>
                    <h6 class="text-white my-3">English</h6>
                </div>
                <!-- Add other properties as needed -->
                <h5 class="text-white py-3 px-4 m-0">Course Price: ${course.fee}</h5>
                <div class="py-3 px-4" id="enrollBtnDiv">
                    <a class="btn btn-block btn-light py-3 px-5" data-course-id=${course.id}"  onclick="enrollment(${course.id})">Enroll Now</a>
                </div>
                <div class="py-3 px-4" id="watchBtnDiv">
                    <a class="btn btn-block btn-light py-3 px-5"  data-course-id=${course.id}" href="lessons.html?id=${course.id}">Watch Now</a>
                </div>
            `;


        if (isEnrolled(course.id)) {
            
            document.getElementById('enrollBtnDiv').style.display = 'none';
            document.getElementById('watchBtnDiv').style.display = 'block';
        } else {
            document.getElementById('enrollBtnDiv').style.display = 'block';
            document.getElementById('watchBtnDiv').style.display = 'none';
        }
        })
        .catch(error => {
            console.error('Error fetching course details:', error);
        });


        
    
const recent_Course =document.getElementById('recentCourse');

fetch('http://127.0.0.1:8000/course/')
.then(res=>res.json())
.then(data=>{
    data.forEach(course=>{
        const couseItem = document.createElement('a');
        couseItem.classList.add('d-flex','align-items-center','text-decoration-none','mb-4');
        couseItem.href=`detail.html?id=${course.id}`;
        couseItem.innerHTML = `
        <div class="pl-3">
        <h6>${course.name}</h6>
        <div class="d-flex">
            <small class="text-body mr-3"><i class="fa fa-user text-primary mr-2"></i>${course.instructor}</small>
            <small class="text-body"><i class="fa fa-star text-primary mr-2"></i>4.5 (250)</small>
        </div>
    </div>`;
    
    recent_Course.appendChild(couseItem);
    
    })
});


if(userId){

    function enrollment(courseId){
        const studentId = localStorage.getItem('user_id');
    
            fetch(`http://127.0.0.1:8000/enroll/`,
            {    
                method: 'POST',
                headers : {"content-type":"application/json"},
                body :JSON.stringify({
                    course:courseId,
                    student:studentId
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('Enrollement Succesfully',data);
                alert('Enrollement Succesfully');
                localStorage.setItem(`enrolled_course_${data.id}`, true);
            })
        
       
    }
}



const getting_value = (id) => {
    const value = document.getElementById(id).value;
    return value;
    }



    const Filter_course = document.getElementById('feature');
    
    if(userId){

        
    fetch(`http://127.0.0.1:8000/enroll/?student=${userId}`)
    .then(res => res.json())
    .then(enrollments => {
        const enrolledCourseIds = enrollments.map(enrollment => enrollment.course);
        fetch('http://127.0.0.1:8000/course/')
            .then(res => res.json())
            .then(data => {
                const Filter_course = data.filter(course => enrolledCourseIds.includes(course.id));
                Filter_course.forEach(course => {
                    localStorage.setItem(`enrolled_course_${course.id}`, true);
                });
            });
        })
        .catch(error => console.error('Error fetching courses:', error));


}

       

const handleContact = (event)=>{
    event.preventDefault();
    
    const name = getting_value("name");
    const email = getting_value("email");
    const subject = getting_value("subject");
    const message = getting_value("message");
    if((name && email && subject && message)){
        fetch("http://127.0.0.1:8000/contact/",{
            method: "POST",
            headers : {"content-type":"application/json"},
            body :JSON.stringify({name,email,subject,message})
        })
        .then(res=>res.json())
        .then((data)=> {console.log(data);
            alert("Thank you for reaching us!!")
            window.location.href ="index.html";
       
    });
    }
    else {
        alert("Please fill in all fields before sending the message.");
    }
   
   
}