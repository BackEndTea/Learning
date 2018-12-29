Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

new Vue({ el: '#components-demo' });

Vue.component('blog-post-cool', {
  props: ['post'],
  template: `
  <div class="blog-post">
  <h3>{{ post.title }}</h3>
  <button v-on:click="$emit('enlarge-text')">
      Enlarge text
  </button>
  <div v-html="post.content"></div>
  </div>
  `
});

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'Bing bong', content:'foobar' },
      { id: 2, title: 'Hip hop stop', content: 'ladsfasdf' },
      { id: 3, title: 'Fun with items', content:'none' }
    ],
    postFontSize: 1,
  }
});
