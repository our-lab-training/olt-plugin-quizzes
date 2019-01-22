module.exports = groupId => [
  { text: 'Quizzes - View', value: `${groupId}.quizzes.read`, defaultRoles: ['user', 'moderator', 'admin'] },
  { text: 'Quizzes - Suggest', value: `${groupId}.quizzes.suggest`, defaultRoles: ['moderator'] },
  { text: 'Quizzes - Edit (Approve Suggestions)', value: `${groupId}.quizzes.write`, defaultRoles: ['admin'] },
];

