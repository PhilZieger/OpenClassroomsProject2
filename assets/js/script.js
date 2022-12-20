let modal = null
let target2 = null
let search = null

function openModal (e) {
  if (e.id !== 'adminEdit') {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
  } else {
    modal = document.querySelector(e.getAttribute('href'))
    console.log(modal)
  }
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.ButtonModal').addEventListener('click', openNewModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
  LoadModal()
}

function closeModal (e) {
  if (modal === null) return
  if (e) {
    e.preventDefault()
  }
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal = null
}

function returnModal (e) {
  closeModal2(e)
  const ReturnTarget = document.querySelector('#adminEdit')
  openModal(ReturnTarget)
}

function closeModal2 (e) {
  if (target2 === null) return
  e.preventDefault()
  target2.style.display = 'none'
  target2.setAttribute('aria-hidden', 'true')
  target2.removeAttribute('aria-modal')
  target2 = null
}

function openNewModal (e) {
  closeModal()

  target2 = document.querySelector('#modal2')
  target2.style.display = null
  target2.removeAttribute('aria-hidden')
  target2.setAttribute('aria-modal', 'true')
  target2.addEventListener('click', closeModal2)
  target2.querySelector('.js-modal-return').addEventListener('click', returnModal)
  target2.querySelector('.js-modal-close2').addEventListener('click', closeModal2)
  target2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
  const categoriesteset = document.querySelector('#Objets')
  if (categoriesteset == null) {
    const selectqueryParent = document.querySelector('#categories')
    const selectqueryChildren = document.querySelector('#Childrenforadd')

    for (let i = window.categories.data.length - 1; i >= 0; i--) {
      const NewOption = document.createElement('option')
      NewOption.value = window.categories.data[i].id
      NewOption.id = window.categories.data[i].name
      const textOption = document.createTextNode(window.categories.data[i].name)
      NewOption.appendChild(textOption)
      selectqueryParent.insertBefore(NewOption, selectqueryChildren.nextSibling)
    }
  }
}

function stopPropagation (e) {
  e.stopPropagation()
}

function verif () {
  const t = document.querySelector('#TitleModalSub')
  const c = document.querySelector('#categories').value
  const i = document.querySelector('#NewPictureID')
  const b = document.querySelector('#buttonModalDisabled')
  if (i !== null) {
    if (i.src !== '' && t.value !== '' && c !== 'error') {
      b.disabled = false
    } else {
      b.disabled = true
    }
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

function LoadModal () {
  // get elements
  const child = document.querySelector('#figchildModal')
  const parent = document.querySelector('#content')

  if (child !== null) {
    // Delete child
    parent.removeChild(child)
  }

  const newDivModal = document.createElement('div')
  newDivModal.id = 'figchildModal'
  newDivModal.className = 'galleryModal'
  for (const work of window.works.data) {
    const newFigureModal = document.createElement('figure')
    newFigureModal.className = ('figureModal')
    newFigureModal.id = ('Modal' + work.id)
    newDivModal.appendChild(newFigureModal)
    const divAbsolute = document.createElement('div')
    divAbsolute.className = ('abso')
    const newImageModal = document.createElement('img')
    newImageModal.crossOrigin = 'anonymous'
    newImageModal.src = work.imageUrl
    newImageModal.alt = work.title
    divAbsolute.appendChild(newImageModal)
    newFigureModal.appendChild(divAbsolute)
    const newDeleteButtonModal = document.createElement('button')
    newDeleteButtonModal.className = ('DeleteButton')
    newDeleteButtonModal.onclick = function () {
      RemoveWork(work.id)
    }
    const ImgDelete = document.createElement('i')
    ImgDelete.className = ('fa-solid fa-trash-can fa-sm colorModal')
    newDeleteButtonModal.appendChild(ImgDelete)
    divAbsolute.appendChild(newDeleteButtonModal)
    const newfigcaptionModal = document.createElement('a')
    newfigcaptionModal.className = 'textModal'
    const textModal = document.createTextNode('éditer')
    newFigureModal.appendChild(newfigcaptionModal)
    newfigcaptionModal.appendChild(textModal)
  }
  const remoteParentElementModal = document.querySelector('#content')
  const originalDivModal = document.querySelector('#border')
  remoteParentElementModal.insertBefore(newDivModal, originalDivModal)
}

document.querySelectorAll('#NewWorks').forEach(a => {
  a.addEventListener('submit', CreateWork)
})

async function CreateWork (e) {
  e.preventDefault()
  const formData = new FormData()
  const token = RecoverCookie('token')
  const photo = this.pict.files[0]
  const title = this.titleModalMenu.value
  const categorie = this.categories.value
  const blob = new Blob([photo], { type: 'image/jpeg' })
  formData.append('image', blob)
  formData.append('title', title)
  formData.append('category', categorie)
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: formData
  })
  const result = await response.json()
  // Add to variable
  window.works.data.push({
    id: result.id,
    title: result.title,
    imageUrl: result.imageUrl,
    categoryId: result.categoryId,
    userId: result.userId
  })
  LoadModal()
  ListingWorks()

  const child = document.querySelector('#pictureModal2')
  const parent = document.querySelector('#NewWorks')
  parent.removeChild(child)
  const PictureModal = document.querySelector('#pictureModal')
  PictureModal.style.display = null
  const Picture = document.querySelector('#pictureModalInport')
  Picture.content = null
  const TextModal = document.querySelector('#TitleModalSub')
  TextModal.value = null
  const CatModal = document.querySelector('#categories')
  CatModal.value = 'error'
}

document.querySelectorAll('#pictureModalInport').forEach(a => {
  a.addEventListener('change', fileChanged)
})

function fileChanged (picture) {
  const file = picture.target.files[0]
  if (file.type.indexOf('image/') !== 0) {
    console.warn('not an image')
  } else {
    const NewPicture = URL.createObjectURL(file)
    const Picture = document.querySelector('#pictureModal')
    Picture.style.display = 'none'
    const newDivModal2 = document.createElement('div')
    newDivModal2.id = 'pictureModal2'
    newDivModal2.className = 'pictureModal'
    const newPictureInModal = document.createElement('img')
    newPictureInModal.src = NewPicture
    newPictureInModal.className = 'PictureResult'
    newPictureInModal.alt = 'Your works Pictures'
    newPictureInModal.id = 'NewPictureID'
    newDivModal2.appendChild(newPictureInModal)
    const remoteParentElementModal2 = document.querySelector('#NewWorks')
    const originalDivModal2 = document.querySelector('#TitleModal2')
    remoteParentElementModal2.insertBefore(newDivModal2, originalDivModal2)
    verif()
  }
}

function RemoveWork (id) {
  const token = RecoverCookie('token')
  fetch('http://localhost:5678/api/works/' + id, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => {
      return response
    })
    .then((data) => {
      if (data.status === 200 || data.status === 204) {
        // Remove Work in Modal
        const WorkId = document.querySelector('#Modal' + id)
        const WorkParent = document.querySelector('#figchildModal')
        WorkParent.removeChild(WorkId)
        // Remove Work in Main Page
        const WorkMainId = document.querySelector('#Main' + id)
        const WorkMainParent = document.querySelector('#figchild')
        WorkMainParent.removeChild(WorkMainId)
        // Remove In Json
        search = id
        const RemoveJson = window.works.data.findIndex(seeIndex)
        window.works.data.splice(RemoveJson, 1)
      } else if (data.status === 401) {
        // Unautorized
      } else if (data.status === 500) {
        // Unexpected Behaviour
      }
    }
    )
}

document.querySelectorAll('body').forEach(a => {
  a.addEventListener('load', onload())
})

function onload () {
  if (window.fetch) {
    fetch('http://localhost:5678/api/works').then(response =>
      response.json().then(dataLoadWorks => ({
        data: dataLoadWorks,
        status: response.status
      })
      ).then(res => {
        window.works = res
        ListingWorks()
        loadAdminPage(true)
      }))

    fetch('http://localhost:5678/api/categories').then(response =>
      response.json().then(dataLoadCategories => ({
        data: dataLoadCategories,
        status: response.status
      })
      ).then(res => {
        window.categories = res
      }))
  } else {
  // Faire quelque chose avec XMLHttpRequest?
  }
}

function seeIndex (value) {
  return value.id === search
}

function loadAdminPage (a) {
  // Load admin page if connected
  if (a === true) {
    if (RecoverCookie('admin') === 'true') {
      const edition = document.querySelector('#edition')
      edition.style.display = 'contents'
      const menuIn = document.querySelector('#loginButton')
      const menuOut = document.querySelector('#logoutButton')
      menuIn.style.display = 'none'
      menuOut.style.display = 'contents'
      const ButtonEdit = document.querySelector('#adminedit')
      ButtonEdit.style.display = 'contents'
      const ButtonEdit2 = document.querySelector('#adminedit2')
      ButtonEdit2.style.display = 'contents'
    }
  } else {
    const edition = document.querySelector('#edition')
    edition.style.display = 'none'
    const menuIn = document.querySelector('#loginButton')
    const menuOut = document.querySelector('#logoutButton')
    menuIn.style.display = 'contents'
    menuOut.style.display = 'none'
    const ButtonEdit = document.querySelector('#adminedit')
    ButtonEdit.style.display = 'none'
    const ButtonEdit2 = document.querySelector('#adminedit2')
    ButtonEdit2.style.display = 'none'
  }
}

document.querySelectorAll('#logoutButton').forEach(a => {
  a.addEventListener('click', Logout)
})

function Logout (e) {
  e.preventDefault()
  document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
  loadAdminPage(false)
}

document.querySelectorAll('#LoginForm').forEach(a => {
  a.addEventListener('submit', LoginUser)
})

async function LoginUser (e) {
  e.preventDefault()
  const user = JSON.stringify({
    email: this.email.value,
    password: this.password.value
  })
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: user
  })
  const result = await response.json()
  if (response.status === 200) {
    // Connected
    const token = result.token
    document.cookie = 'token=' + token
    document.cookie = 'admin=' + 'true'
    document.location.href = 'index.html'
  } else if (response.status === 401 || response.status === 404) {
    // Rong e-mail or password
    const remoteRongElement = document.querySelector('#rong')
    remoteRongElement.textContent = 'Erreur dans l\'identifiant ou le mot de passe'
  }
}

function RecoverCookie (nom) {
  nom = nom + '='
  const liste = document.cookie.split(';')
  for (let i = 0; i < liste.length; i++) {
    let c = liste[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nom) === 0) return c.substring(nom.length, c.length)
  }
  return null
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

function ShowWorkMenu (button) {
  const all = document.querySelector('#all')
  const obj = document.querySelector('#obj')
  const app = document.querySelector('#app')
  const hotel = document.querySelector('#hotel')
  if (button === 'obj') {
    obj.style.background = '#1D6154'
    obj.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
  } else if (button === 'app') {
    app.style.background = '#1D6154'
    app.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
  } else if (button === 'hotel') {
    hotel.style.background = '#1D6154'
    hotel.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
  } else {
    all.style.background = '#1D6154'
    all.style.color = '#FFFFFF'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
  }
}

function RemovePage () {
  // get elements
  const child = document.querySelector('#figchild')
  const parent = document.querySelector('#gallery')

  if (child !== null) {
    // Delete child
    parent.removeChild(child)
  }
}

function UpdatePage (c) {
  const newDiv = document.createElement('div')
  newDiv.id = 'figchild'
  newDiv.className = 'gallery'
  if (c === 'obj') {
    category = 1
    filter = true
  } else if (c === 'app') {
    category = 2
    filter = true
  } else if (c === 'hotel') {
    category = 3
    filter = true
  } else {
    category = null
    filter = false
  }

  for (const work of window.works.data) {
    if (work.categoryId === category && filter) {
      const newFigure = document.createElement('figure')
      newFigure.id = ('Main' + work.id)
      newDiv.appendChild(newFigure)
      const newImage = document.createElement('img')
      newImage.crossOrigin = 'anonymous'
      newImage.src = work.imageUrl
      newImage.alt = work.title
      newFigure.appendChild(newImage)
      const newfigcaption = document.createElement('figcaption')
      const text = document.createTextNode(work.title)
      newFigure.appendChild(newfigcaption)
      newfigcaption.appendChild(text)
    } else if (filter === false) {
      const newFigure = document.createElement('figure')
      newFigure.id = ('Main' + work.id)
      newDiv.appendChild(newFigure)
      const newImage = document.createElement('img')
      newImage.crossOrigin = 'anonymous'
      newImage.src = work.imageUrl
      newImage.alt = work.title
      newFigure.appendChild(newImage)
      const newfigcaption = document.createElement('figcaption')
      const text = document.createTextNode(work.title)
      newFigure.appendChild(newfigcaption)
      newfigcaption.appendChild(text)
    }
  }

  const remoteParentElement = document.querySelector('#gallery')
  const originalDiv = document.querySelector('#children')
  remoteParentElement.insertBefore(newDiv, originalDiv)
}

function ListingWorks (e) {
  RemovePage()
  const urlCourante = document.location.href
  const queueUrl = urlCourante.substring(urlCourante.lastIndexOf('/') + 1)
  if (queueUrl !== 'login.html') {
    if (e) {
      e.preventDefault()
      ShowWorkMenu(e.path[0].id)
      UpdatePage(e.path[0].id)
    } else {
      UpdatePage()
      ShowWorkMenu()
    }
  }
}
