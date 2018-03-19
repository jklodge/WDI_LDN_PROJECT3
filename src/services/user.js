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


  this.find = find;
  this.findById = findById;
  this.update = update;
}

export default User;
