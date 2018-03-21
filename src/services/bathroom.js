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
    return $http.put(`/api/bathrooms/${bathroom._id}/`, bathroom);
  }

  function remove(bathroom) {
    return $http.delete(`/api/bathrooms/${bathroom._id}`);
  }

  function findBathroom(id) {
    return $http.get(`/api/bathrooms/${id}`);
  }

  function createRequest(bathroom, request) {
    return $http.post(`/api/bathrooms/${bathroom._id}/requests`, request);
  }

  function acceptRequest(bathroom, request) {
    return $http.put(`/api/bathrooms/${bathroom._id}/requests/${request._id}/accepted`, request);
  }

  function rejectRequest(bathroom, request) {
    return $http.put(`/api/bathrooms/${bathroom._id}/requests/${request._id}/rejected`, request);
  }

  function commentCreate(id, comment){
    return $http.post(`/api/bathrooms/${id}/comments`, comment);
  }

  function deleteComment(id, commentId){
    return $http.delete(`/api/bathrooms/${id}/comments/${commentId}`);
  }

  this.find = find;
  this.create = create;
  this.findById = findById;
  this.update = update;
  this.remove = remove;
  this.createRequest = createRequest;
  this.acceptRequest = acceptRequest;
  this.rejectRequest = rejectRequest;
  this.findBathroom = findBathroom;
  this.commentCreate = commentCreate;
  this.deleteComment = deleteComment;
}

export default Bathroom;
