let modal = null

const openModal = function (e) {
  
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault() 
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}


document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})


function onload() {
  if (window.fetch) {
      fetch('http://localhost:5678/api/works').then(response => 
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {
        works = res;
        ListingWorks(0);
        loadAdminPage();
        
      }));

  } else {
      // Faire quelque chose avec XMLHttpRequest?
  }
  
}

function Logout() {
  document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}

function loadAdminPage() {
  //Load admin page if connected
  if (recupererCookie("admin") == "true") {
    var edition = document.getElementById('edition');
    edition.style.display = 'contents';
    var menuIn = document.getElementById('loginButton');
    var menuOut = document.getElementById('logoutButton');
    menuIn.style.display = 'none';
    menuOut.style.display = 'contents';
    var ButtonEdit = document.getElementById('adminedit');
    ButtonEdit.style.display = 'contents';
  }
}

async function loginuser(email, password) {
  user = JSON.stringify({
      email: email,
      password: password
  })
    
    let response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: user
    });
    let result = await response.json();
    console.log(response.status);
    if (response.status == 200 ) {
      //Connected
      token = result.token;
      document.cookie = "token=" + token;
      document.cookie = "admin=" + "true";
      document.location.href="index.html"; 
    } else if ( response.status == 401 || response.status == 404) {
      //Rong e-mail or password
      const remoteRongElement = document.getElementById('rong');
      remoteRongElement.textContent = "Votre identifiant est incorrecte !";
    }
}

function recupererCookie(nom) {
  nom = nom + "=";
  var liste = document.cookie.split(';');
  for (var i = 0; i < liste.length; i++) {
      var c = liste[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nom) == 0) return c.substring(nom.length, c.length);
  }
  return null;
}
function ListingWorks(category) {

  if (category == 0 ) {
      var all = document.getElementById('all');
      all.style.background = '#1D6154';
      all.style.color = '#FFFFFF';

      var all = document.getElementById('obj');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('app');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';
      
      var all = document.getElementById('hotel');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      // get elements
      var child = document.getElementById("figchild");
      var parent = document.getElementById("gallery");

      if (child == null) {
        
      } else {
        // Delete child
        console.log(child);
        parent.removeChild(child);
      }
      

      const newDiv = document.createElement("div");
      newDiv.id = "figchild";
      newDiv.className = "gallery";
  for (const work of window.works.data) {
      
      const newFigure = document.createElement("figure");
      newDiv.appendChild(newFigure);
      const newImage = document.createElement("img");
      newImage.crossOrigin = "anonymous";
      newImage.src = work['imageUrl'];
      newImage.alt = work['title'];
      newFigure.appendChild(newImage);
      const newfigcaption = document.createElement("figcaption");
      const text = document.createTextNode(work['title']);
      newFigure.appendChild(newfigcaption);
      newfigcaption.appendChild(text);

      
    

  }

    const remoteParentElement = document.getElementById('gallery');
    const originalDiv = document.getElementById("children");
    remoteParentElement.insertBefore(newDiv, originalDiv);


  } else {


    if ( category == 1 ) {
      var all = document.getElementById('all');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('obj');
      all.style.background = '#1D6154';
      all.style.color = '#FFFFFF';

      var all = document.getElementById('app');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';
      
      var all = document.getElementById('hotel');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';
    } else if ( category == 2 ) {
      var all = document.getElementById('all');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('obj');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('app');
      all.style.background = '#1D6154';
      all.style.color = '#FFFFFF';
      
      var all = document.getElementById('hotel');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';
    } else if ( category == 3 ) {
      var all = document.getElementById('all');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('obj');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';

      var all = document.getElementById('app');
      all.style.background = '#FFFFFF';
      all.style.color = '#1D6154';
      
      var all = document.getElementById('hotel');
      all.style.background = '#1D6154';
      all.style.color = '#FFFFFF';
    }

 
      console.log(window.works.data[1])
      // get elements
      var child = document.getElementById("figchild");
      var parent = document.getElementById("gallery");

      // Delete child
      parent.removeChild(child);


      const newDiv = document.createElement("div");
          newDiv.id = "figchild";
          newDiv.className = "gallery";
      for (const work of window.works.data) {
          
        if ( work['categoryId'] == category ) {

           
          const newFigure = document.createElement("figure");
          newDiv.appendChild(newFigure);
          const newImage = document.createElement("img");
          newImage.crossOrigin = "anonymous";
          newImage.src = work['imageUrl'];
          newImage.alt = work['title'];
          newFigure.appendChild(newImage);
          const newfigcaption = document.createElement("figcaption");
          const text = document.createTextNode(work['title']);
          newFigure.appendChild(newfigcaption);
          newfigcaption.appendChild(text);

          }
        

      }

        const remoteParentElement = document.getElementById('gallery');
        const originalDiv = document.getElementById("children");
        remoteParentElement.insertBefore(newDiv, originalDiv);
  }
}
