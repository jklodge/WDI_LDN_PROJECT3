User.$inject = ['$http'];

function User($http) {
  function find() {
    return $http.get('/api/users');
  }

  function findById(id) {
    return $http.get(`/api/users/${id}`);
  }

  function update(user) {
    return $http.put(`/api/users/${user._id}`, user);
  }

  function findBathroom(id) {
    return $http.get(`/api/bathrooms/${id}`);
  }

  this.find = find;
  this.findById = findById;
  this.update = update;
  this.findBathroom = findBathroom;

}

export default User;
