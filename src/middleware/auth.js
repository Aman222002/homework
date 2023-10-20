export default function auth(to, next,router ) {
    const isAuthorised =parseInt (localStorage.getItem('isLogin') ?? "0");
    console.log("isAuth",isAuthorised)
    if (isAuthorised) {
        console.log("Yes");
        next();
      }
      else{
        router.push({path:'/login'});
      }
    }