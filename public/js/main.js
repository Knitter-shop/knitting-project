window.onload = () => {
  const likeBtns = document.querySelectorAll('.like-btn')

  likeBtns.forEach(likeBtn => {
    const productId = likeBtn.value;

    const iconNode = likeBtn.querySelector('.bi')
    const likeCount = likeBtn.querySelector('span')

    likeBtn.onclick = () => {
      axios.post(`/products/${productId}/like`)
        .then((response) => {
          if (response.status === 201) {
            iconNode.classList.remove('bi-heart');
            iconNode.classList.add('bi-heart-fill');
            likeCount.textContent = Number(likeCount.textContent) + 1
          } else if (response.status === 204) {
            iconNode.classList.add('bi-heart');
            iconNode.classList.remove('bi-heart-fill');
            likeCount.textContent = Number(likeCount.textContent) - 1
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })

  const saveBtns = document.querySelectorAll('.save-btn')

  saveBtns.forEach(saveBtn => {

    const productId = saveBtn.value;
    const iconNode = saveBtn.querySelector('.bi')

    saveBtn.onclick = () => {
      axios.post(`/products/${productId}/save`)
        .then((response) => {
          if (response.status === 201) {
            iconNode.classList.remove('bi-bookmark');
            iconNode.classList.add('bi-bookmark-fill');
          } else if (response.status === 204) {
            iconNode.classList.add('bi-bookmark');
            iconNode.classList.remove('bi-bookmark-fill');
          }
        })
        .then(()=> {
          const currentLocation = window.location.href
          const urlSplitted = currentLocation.split('/')
          if(urlSplitted[urlSplitted.length-1].includes('profile')) {
            window.location='/profile'
          }
          
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
}

const deleteBtns = document.querySelectorAll(".delete-btn");
[...deleteBtns].forEach(btn => {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const formNode = event.currentTarget.parentNode;
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
      formNode.submit();
    }
  });
})
