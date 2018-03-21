BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  vm.user = null;
  vm.message = '';


  function getBathroomData(){
    Bathroom.findById($state.params.id)
      .then(res => {
        vm.bathroom = res.data;
        console.log(vm.bathroom);
      });
  }


  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
        console.log(vm.user);
      });
  }

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleRequest() {
    vm.bathroom.isAvailable = false;
    Bathroom.update(vm.bathroom)
      .then(res => {
        Bathroom.createRequest(vm.bathroom, {user: vm.bathroom.requests._id});
        vm.bathroom = res.data;
        // console.log(vm.bathroom);
      });
  }


  function handleComment(){
    Bathroom.commentCreate($state.params.id, this.comments)
      .then(() => {
        this.comments.content = '';
        this.comments.rating = '';
        getBathroomData();
      });
    // console.log(vm.bathroom.avgRating);
  }

  function handleDelete(commentId){
    Bathroom.deleteComment($state.params.id, commentId)
      .then(getBathroomData);
  }

  vm.remove = remove;
  vm.handleRequest = handleRequest;
  vm.handleComment = handleComment;
  vm.handleDelete = handleDelete;

  getBathroomData();
}

export default BathroomsShowCtrl;
