import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default function (router) {
    // router.beforeEach((to, from, next) => {
    //     NProgress.start()
        // if(to.path !== '/login') {
        //   console.log(localStorage.getItem("useName"), 'totototototototo2');
        //   if(localStorage.getItem("useName") !== null) {
        //     next()
        //   }else{
        //     next({path: '/login'})
        //   }
        // }else{
        //   if(localStorage.getItem("useName") !== null) {
        //     next({path: '/blog'})
        //   }else{
        //     next({path: '/blog'})
        //   }
        // }
    // });
    // router.afterEach((to, from) => {
    //   NProgress.done()
    // })
    router.beforeEach((to, from, next) => {
      NProgress.start()
      if(localStorage.getItem("useName") === null && to.path !== '/login') {
        console.log(to.path, 'totototototototo2');
        next({path: '/login'})       
      }else{
        next()
        console.log(localStorage.getItem("useName"), 'localStorage.getItem("useName")localStorage.getItem("useName")');
      }
    });
    router.afterEach((to, from) => {
       NProgress.done()
    })
}
