BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  console.log(vm.bathroom);
  vm.user = null;
  vm.message = '';

  getBathroomData();

  function getBathroomData(){
    Bathroom.findById($state.params.id)
      .then(res => {
        vm.bathroom = res.data;
        // console.log('previous users',vm.bathroom.previousUsers, vm.user);
      })
      .then(() => {
        vm.destinationLat = vm.bathroom.location.lat;
        vm.destinationLng =  vm.bathroom.location.lng;
      });
    console.log('user', vm.user);
  }


  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
        getBathroomData();
        if(vm.bathroom.previousUsers.includes(vm.user._id)) vm.user.isPrevious = true;
        vm.user.index = vm.bathroom.previousUsers.indexOf(vm.user._id);
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


  function handleComment(){
    Bathroom.commentCreate($state.params.id, vm.comments)
      .then(() => $state.go($state.current, {id: $state.params.id}, {reload: true}))
      .then(() => {
        vm.comments.content = '';
        vm.comments.rating = '';
        getBathroomData();
      });
    vm.bathroom.previousUsers.splice(vm.user.index, 1);
    Bathroom.update(vm.bathroom);
  }


  function handleDelete(commentId){
    Bathroom.deleteComment($state.params.id, commentId)
      .then(getBathroomData);
  }

  vm.remove = remove;
  vm.handleRequest = handleRequest;
  vm.handleComment = handleComment;
  vm.handleDelete = handleDelete;

}

export default BathroomsShowCtrl;
