import placehold from './placehold.vue';
import perms from '../perms';

export default {
  ref: 'quizzes',
  name: 'Quizzes',
  // settingsLink: '/group/{groupId}/quizzes/settings',
  routes: {
    quizzes: {
      name: 'My Quizzes',
      entry: true,
      component: placehold,
      path: '/org/{groupId}/quizzes',
      icon: 'fal fa-ballot-check',
      visiblePerms: [
        '{groupId}.quizzes.read',
      ],
    },
  },
  store: { quizzes: {}, attempts: {}, questions: {} },
  perms,
};
