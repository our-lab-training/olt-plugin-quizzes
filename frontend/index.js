import placehold from './placehold.vue';
import perms from '../perms';

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
  },
  store: { quizzes: {}, attempts: {}, questions: {} },
  perms,
};
