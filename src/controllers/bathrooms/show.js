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
      });
  }


  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
        getBathroomData();
        if(vm.bathroom.previousUsers.includes(vm.user._id)) vm.user.isPrevious = true;
      });
  }

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  function handleRequest() {
    vm.bathroom.isAvailable = false;
    Bathroom.update(vm.bathroom)
      .then(res => {
        Bathroom.createRequest(vm.bathroom, {user: vm.bathroom.requests._id});
        vm.bathroom = res.data;
      })
      .then(() => $state.go($state.current, {}, {reload: true}));
  }
  // vm.text = '';


  function handleComment(){
    Bathroom.commentCreate($state.params.id, this.comments)
      .then(() => $state.go($state.current, {id: $state.params.id}, {reload: true}))
      .then(() => {
        this.comments.content = '';
        this.comments.rating = '';
        getBathroomData();
      });
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
