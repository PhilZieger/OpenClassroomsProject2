let modal = null
let target2 = null

function NextModale() {
  var childFirst = document.getElementById("ModalChild1");
  var parentFirst = document.getElementById("ModalParent");
  parentFirst.removeChild(childFirst);
}

const openModal = function (e) {
  
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.ButtonModal').addEventListener('click', openNewModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

  LoadModal();
}

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault() 
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.ButtonModal').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}

const closeModal2 = function (e) {
  if (target2 === null) return
  e.preventDefault() 
  target2.style.display = "none"
  target2.setAttribute('aria-hidden', 'true')
  target2.removeAttribute('aria-modal')
  target2.removeEventListener('click', closeModal2)
  target2.querySelector('.js-modal-close2').removeEventListener('click', closeModal2)
  target2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation)
  target2 = null
}

const openNewModal = function (e) {
    
    if (modal === null) return
    e.preventDefault() 
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.ButtonModal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
    
    target2 = document.getElementById("modal2");
    target2.style.display = null;
    target2.removeAttribute('aria-hidden')
    target2.setAttribute('aria-modal', 'true')

    target2.addEventListener('click', closeModal2)
    target2.querySelector('.js-modal-close2').addEventListener('click', closeModal2)
    target2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)

    var selectqueryParent = document.getElementById("categories");
    var selectqueryChildren = document.getElementById("Childrenforadd");

    for (let i=window.categories.data.length-1; i>=0; i--){
        console.log(window.categories.data[i]);
      const NewOption = document.createElement("option");
      NewOption.value = window.categories.data[i].id;
      const textOption = document.createTextNode(window.categories.data[i].name);
      NewOption.appendChild(textOption);
      selectqueryParent.insertBefore(NewOption, selectqueryChildren.nextSibling);
    }
}

const stopPropagation = function (e) {
  e.stopPropagation()
}


document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})


function LoadModal() {

  // get elements
  var child = document.getElementById("figchildModal");
  var parent = document.getElementById("content");

  if (child == null) {
    
  } else {
    // Delete child
    parent.removeChild(child);
  }

  const newDivModal = document.createElement("div");
  newDivModal.id = "figchildModal";
  newDivModal.className = "galleryModal";
  for (const work of window.works.data) {       
    const newFigureModal = document.createElement("figure");
    newFigureModal.className = ('figureModal');
    newFigureModal.id = (work.id);
    newDivModal.appendChild(newFigureModal);

    const divAbsolute = document.createElement("div");
    divAbsolute.className = ('abso');
    
    const newImageModal = document.createElement("img");
    newImageModal.crossOrigin = "anonymous";
    newImageModal.src = work['imageUrl'];
    newImageModal.alt = work['title'];
    divAbsolute.appendChild(newImageModal);
    newFigureModal.appendChild(divAbsolute);


    const newDeleteButtonModal = document.createElement("button");
    newDeleteButtonModal.className = ('DeleteButton');
    newDeleteButtonModal.onclick = function() {
      RemoveWork(work['id']);
    };
    const ImgDelete = document.createElement("i");
    ImgDelete.className = ('fa-solid fa-trash-can fa-sm colorModal');
    newDeleteButtonModal.appendChild(ImgDelete);
    divAbsolute.appendChild(newDeleteButtonModal);


    const newfigcaptionModal = document.createElement("a");
    newfigcaptionModal.className= "textModal";
    const textModal = document.createTextNode("éditer");
    newFigureModal.appendChild(newfigcaptionModal);
    newfigcaptionModal.appendChild(textModal);   
  }
  const remoteParentElementModal = document.getElementById('content');
  const originalDivModal = document.getElementById("border");
  remoteParentElementModal.insertBefore(newDivModal, originalDivModal);

}

function RemoveWork(id) {
  var token = recupererCookie('token');
  console.log("Bearer " + token)
  /*
  user = JSON.stringify({
      email: email,
      password: password
  })
  */ 
  fetch('http://localhost:5678/api/works/' + id , {
    method: 'DELETE',
    headers: {
      accept: "*/*",
      Authorization: "Bearer " + token
    }
  })
  .then(response => {
    return response
  })
  .then((data) => {
    if (data.status == 200 || data.status == 204) {
      console.log('Item Deleted');
      //Remove Work in Modal
      const WorkId = document.getElementById(id);
      const WorkParent = document.getElementById('figchildModal');
      WorkParent.removeChild(WorkId);
      //Remove Work in Main Page
      const WorkMainId = document.getElementById('Main' + id);
      const WorkMainParent = document.getElementById('figchild');
      WorkMainParent.removeChild(WorkMainId);

      //Remove In Json
      search = id;
      RemoveJson = works.data.findIndex(seeIndex);
      works.data.splice(RemoveJson, 1);

    } else if (data.status == 401) {
      console.log('Unauthorized');
    } else if (data.status == 500) {
      console.log('Unexpected Behaviour');
    }
  });
}

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

      fetch('http://localhost:5678/api/categories').then(response => 
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {
        categories = res;
        
      }));

  } else {
      // Faire quelque chose avec XMLHttpRequest?
  }
  
}

function seeIndex(value) {
    return value.id == search;
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
    var ButtonEdit2 = document.getElementById('adminedit2');
    ButtonEdit2.style.display = 'contents';
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
    if (response.status == 200 ) {
      //Connected
      token = result.token;
      document.cookie = "token=" + token;
      document.cookie = "admin=" + "true";
      document.location.href="index.html"; 
    } else if ( response.status == 401 || response.status == 404) {
      //Rong e-mail or password
      const remoteRongElement = document.getElementById('rong');
      remoteRongElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
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
        parent.removeChild(child);
      }
      

      const newDiv = document.createElement("div");
      newDiv.id = "figchild";
      newDiv.className = "gallery";
  for (const work of window.works.data) {
      const newFigure = document.createElement("figure");
      newFigure.id = ('Main' + work.id);
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
          newFigure.id = ('Main' + work.id);
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
