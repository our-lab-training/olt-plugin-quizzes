<template>
  <span>Content Placeholder for {{currentGroup ? currentGroup.name : 'Group Not Found'}}</span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('groups', { currentGroup: 'current' }),
  },
};
</script>
