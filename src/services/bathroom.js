Bathroom.$inject = ['$http'];

function Bathroom($http) {

  function find() {
    return $http.get('/api/bathrooms');
  }

  function create(bathroom) {
    return $http.post('/api/bathrooms', bathroom);
  }

  function findById(id) {
    return $http.get(`/api/bathrooms/${id}`);
  }

  function update(bathroom) {
    return $http.put(`/api/bathrooms/${bathroom._id}`, bathroom);
  }

  function remove(bathroom) {
    return $http.delete(`/api/bathrooms/${bathroom._id}`);
  }

  this.find = find;
  this.create = create;
  this.findById = findById;
  this.update = update;
  this.remove = remove;

}

export default Bathroom;
