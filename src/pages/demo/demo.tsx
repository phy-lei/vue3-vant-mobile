import { defineComponent } from 'vue';
import Base from './base';

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <div>
        <Base></Base>
      </div>
    );
  },
});
