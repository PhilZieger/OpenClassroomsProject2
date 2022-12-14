if (window.fetch) {
    fetch('http://localhost:5678/api/works').then(response => 
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      works = res;
      ListingWorks(0);
      
    }));

} else {
    // Faire quelque chose avec XMLHttpRequest?
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