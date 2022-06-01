import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",

    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/LogoutView.vue"),
  },
  {
    path: "/profile/@:user",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/mycontent",
    name: "mycontent",
    component: () => import("../views/MyContentView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/SettingsView.vue"),
  },
  {
    path: "/newpost",
    name: "newpost",
    component: () => import("../views/NewPostView.vue"),
  },
  {
    path: "/posts/@:creator/:title.:id",
    name: "post",
    component: () => import("../views/PostsView.vue"),
  },
  {
    path: "/posts/@:creator/:id",
    name: "postss",
    component: () => import("../views/PostsView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => {
      import("../views/PageNotFoundView.vue");
    },
  },
  {
    path: "/404",
    name: "404html",
    component: () => import("../views/PageNotFoundView.vue"),
  },
  {
    path: "/@:user",
    name: "sprofile",
    component: () => import("../views/UserProfileView.vue"),
  },
  {
    path: "/user/editpost/@:creator/:title.:id",
    name: "editpost",
    component: () => import("../views/EditPostView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const _isAuthenticated = store.getters._isAuthenticated;
  const authRequiredPaths = ["user", "settings"];
  if (authRequiredPaths.indexOf(to.name) > -1) {
    if (_isAuthenticated) {
      next();
    } else router.push({ name: "login" });
  } else {
    next();
  }
});
export default router;
