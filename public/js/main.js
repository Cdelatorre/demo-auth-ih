window.addEventListener('load', () => {
  const deleteButtons = document.querySelectorAll(".delete-book-btn")
  const roleButtons = document.querySelectorAll(".change-role-btn")

  const deleteBook = (url, bookContainer) => {
    axios.delete(url)
      .then(res => {
        bookContainer.remove()

        axios.get('http://localhost:8000/cities')
          .then(res => {
            console.log(res.data)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const userToAdmin = (url) => {
    axios.patch(url)
      .then(res => {
        window.location.reload()
      })
  }

  deleteButtons.forEach(button => {
    const { id } = button.dataset;
    const url = `http://localhost:3000/books/${id}`
    const bookContainer = button.parentElement.parentElement.parentElement

    button.addEventListener('click', () => deleteBook(url, bookContainer))
  })


  roleButtons.forEach(button => {
    const { id } = button.dataset;
    const url = `http://localhost:3000/user/${id}/admin`

    button.addEventListener('click', () => userToAdmin(url))
  })


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      mapboxgl.accessToken =
        'pk.eyJ1IjoiY2RlbGF0b3JyZSIsImEiOiJja3Y5bHJ6ZzcweG0yMnZtZzI4eXJna2UxIn0.m-OWQWPhRrb5ZNRz0M9AqQ';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [center.lng, center.lat],
        zoom: 18
      });


      const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([center.lng, center.lat])
        .addTo(map);

    }, function () {
      console.log('Error in the geolocation service.');
    });
  }


})
