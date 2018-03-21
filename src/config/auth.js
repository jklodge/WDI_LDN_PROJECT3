Auth.$inject = ['$authProvider'];

function Auth($authProvider){
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.facebook({
    clientId: '174192073207122',
    url: '/api/facebook'
  });

}

export default Auth;
