const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const lessonID = getParameterByName('id');

    fetch(`http://127.0.0.1:8000/lesson/?course=${lessonID}`)
    .then(res=>res.json())
    .then((data)=>{
        data.forEach(lesson=>{
            
            const lesson_data = document.createElement('div');
             lesson_data.innerHTML = ` 
             <div class="video">
             <img src="img/Video-Player-PNG-Picture.png" alt="">
             <p>${lesson.order}</p>
             <h3 class="title">${lesson.title}</h3>
             <p class="times">${lesson.duration}</p>
         </div>` 

         video_playlist.appendChild(lesson_data);
         lesson_data.addEventListener('click', () => {   
            video_playlist.querySelectorAll('.video').forEach(element=>{element.classList.remove('active');
            element.querySelector('img').src="img/Video-Player-PNG-Picture.png";
            
         });
         lesson_data.classList.add('active');
         lesson_data.querySelector('img').src="img/16427.png ";
         main_video.src = lesson.video;
         main_video_title.textContent = lesson.title;
         });
        })
    })


  