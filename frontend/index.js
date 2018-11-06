import placehold from './placehold.vue';

export default {
  ref: 'quizzes',
  name: 'Quizzes',
  settingsLink: '/group/{groupId}/quizzes/settings',
  routes: {
    quizzes: {
      name: 'My Quizzes',
      entry: true,
      component: placehold,
      path: '/group/{groupId}/quizzes',
      icon: 'ballot',
      visiblePerms: [
        '{groupId}.quizzes.read',
      ],
    },
    quizzesAdmin: {
      name: 'Manage Quizzes',
      entry: true,
      component: placehold,
      path: '/group/{groupId}/quizzes/admin',
      icon: 'assignment',
      priority: 20,
      visiblePerms: [
        '{groupId}.quizzes.write',
      ],
    },
  },
  store: { quizzes: {}, attempts: {}, questions: {} },
};
