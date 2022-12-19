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

    categoriesteset = document.getElementById("Objets");
    
    if ( categoriesteset == null ) {
      var selectqueryParent = document.getElementById("categories");
      var selectqueryChildren = document.getElementById("Childrenforadd");

      for (let i=window.categories.data.length-1; i>=0; i--){

        const NewOption = document.createElement("option");
        NewOption.value = window.categories.data[i].id;
        NewOption.id = window.categories.data[i].name;
        const textOption = document.createTextNode(window.categories.data[i].name);
        NewOption.appendChild(textOption);
        selectqueryParent.insertBefore(NewOption, selectqueryChildren.nextSibling);
        
      }
    }
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

function verif() {
  var t = document.getElementById("TitleModalSub");
  var c = document.getElementById("categories").value;
  var i = document.getElementById("NewPictureID");
    if ( i.src != "" && t.value != "" && c != "error") {
      var b = document.getElementById("buttonModalDisabled");
      buttonModalDisabled.disabled = false;
    } else {
      buttonModalDisabled.disabled = true;
    }

}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})

document.querySelectorAll('#TitleModalSub').forEach(a => {
  a.addEventListener('change', verif)
})
document.querySelectorAll('#categories').forEach(a => {
  a.addEventListener('change', verif)
})
document.querySelectorAll('#pictureModalInport').forEach(a => {
  a.addEventListener('change', verif)
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


document.querySelectorAll('#NewWorks').forEach(a => {
  a.addEventListener('submit', CreateWork)
})


async function CreateWork (e) {
  e.preventDefault();
  console.log(this.titleModalMenu.value);
  console.log(this.categories.value);
  console.log(this.pict.files[0].name);
  
  var formData = new FormData();
  var token = recupererCookie('token');
  var photo = this.pict.files[0];
  var title = this.titleModalMenu.value;
  var categorie = this.categories.value;
  var blob = new Blob([photo], { type: "image/jpeg"});
  formData.append('image', blob);
  formData.append('title', title);
  formData.append('category', categorie);
  console.log(formData);
  let response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer " + token
      },
      body: formData,
    });
    let result = await response.json();
}






function file_changed(picture) {
  var file = picture.files[0];
  if(file.type.indexOf('image/') !== 0){
    console.warn('not an image');
    }
  var NewPicture = URL.createObjectURL(file);



  // var Picture = document.getElementById("ModalePic");
  // Picture.style.display = 'none';

  // var Lab = document.getElementById("ModaleLab");
  // Lab.style.display = 'none';

  // var Span = document.getElementById("ModaleSpan");
  // Span.style.display = 'none';

  var Picture = document.getElementById("pictureModal");
  Picture.style.display = 'none';
    
    
  const newDivModal2 = document.createElement("div");
  newDivModal2.id = "pictureModal";
  newDivModal2.className = "pictureModal";
    
  const newPictureInModal = document.createElement("img");
  newPictureInModal.src = NewPicture;
  newPictureInModal.className = "PictureResult";
  newPictureInModal.alt = "Your works Pictures";
  newPictureInModal.id = "NewPictureID";
    
  newDivModal2.appendChild(newPictureInModal);
    
  const remoteParentElementModal2 = document.getElementById('NewWorks');
  const originalDivModal2 = document.getElementById("TitleModal2");
  remoteParentElementModal2.insertBefore(newDivModal2, originalDivModal2);





  

}

function RemoveWork(id) {
  var token = recupererCookie('token');
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
      //Unautorized
    } else if (data.status == 500) {
      //Unexpected Behaviour
    }
  });
}


document.querySelectorAll('body').forEach(a => {
  a.addEventListener('load', onload())
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
        ListingWorks();
        loadAdminPage(true);
        
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

function loadAdminPage(a) {
  //Load admin page if connected
  if (a == true) {
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
  } else {
    var edition = document.getElementById('edition');
    edition.style.display = 'none';
    var menuIn = document.getElementById('loginButton');
    var menuOut = document.getElementById('logoutButton');
    menuIn.style.display = 'contents';
    menuOut.style.display = 'none';
    var ButtonEdit = document.getElementById('adminedit');
    ButtonEdit.style.display = 'none';
    var ButtonEdit2 = document.getElementById('adminedit2');
    ButtonEdit2.style.display = 'none';
  }
  
}

document.querySelectorAll('#logoutButton').forEach(a => {
  a.addEventListener('click', Logout)
})

function Logout (e) {
  e.preventDefault();
    document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    loadAdminPage(false)
}




/*
document.querySelectorAll('#LoginForm').forEach(a => {
  a.addEventListener('submit', LoginUser)
})
*/

async function LoginUser (email, password) {
  // var email = this.email.value;
  // var password = this.password.value;
  
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

document.querySelectorAll('#all').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#obj').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#app').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#hotel').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

function ShowWorkMenu(button) {

  var all = document.querySelectorAll('#all')[0];
  var obj = document.querySelectorAll('#obj')[0];
  var app = document.querySelectorAll('#app')[0];
  var hotel = document.querySelectorAll('#hotel')[0];
  if (button == 'obj') {
    obj.style.background = '#1D6154';
    obj.style.color = '#FFFFFF';  
    all.style.background = '#FFFFFF';
    all.style.color = '#1D6154';
    app.style.background = '#FFFFFF';
    app.style.color = '#1D6154';
    hotel.style.background = '#FFFFFF';
    hotel.style.color = '#1D6154';

  } else if (button == 'app') {
    app.style.background = '#1D6154';
    app.style.color = '#FFFFFF';  
    all.style.background = '#FFFFFF';
    all.style.color = '#1D6154';
    obj.style.background = '#FFFFFF';
    obj.style.color = '#1D6154';
    hotel.style.background = '#FFFFFF';
    hotel.style.color = '#1D6154';
  } else if (button == 'hotel') {
    hotel.style.background = '#1D6154';
    hotel.style.color = '#FFFFFF';  
    all.style.background = '#FFFFFF';
    all.style.color = '#1D6154';
    obj.style.background = '#FFFFFF';
    obj.style.color = '#1D6154';
    app.style.background = '#FFFFFF';
    app.style.color = '#1D6154';
  } else {
    all.style.background = '#1D6154';
    all.style.color = '#FFFFFF';  
    hotel.style.background = '#FFFFFF';
    hotel.style.color = '#1D6154';
    obj.style.background = '#FFFFFF';
    obj.style.color = '#1D6154';
    app.style.background = '#FFFFFF';
    app.style.color = '#1D6154';
  }
}

function RemovePage () {
  // get elements
  var child = document.getElementById("figchild");
  var parent = document.getElementById("gallery");

  if (child == null) {
    
  } else {
    // Delete child
    parent.removeChild(child);
  }
}

function UpdatePage (c) {
  const newDiv = document.createElement("div");
  newDiv.id = "figchild";
  newDiv.className = "gallery";
  if (c == "obj") {
    category = "1";
    filter = true;
  } else if (c == "app") {
    category = "2";
    filter = true;
  } else if (c == "hotel") {
    category = "3";
    filter = true;
  } else {
    category = null;
    filter = false;
  }

  for (const work of window.works.data) {
    if ( work['categoryId'] == category && filter ) {
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
    } else if ( filter == false ) {
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

function ListingWorks (e) {
  RemovePage();
  if (e) {
    e.preventDefault()
    ShowWorkMenu(e.path[0].id);
    UpdatePage(e.path[0].id);
  } else {
    UpdatePage();
    ShowWorkMenu();
  }
}
