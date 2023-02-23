import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import createMapDialog, { destroyAllMapDialog } from '@/components/Map/render';
import 'amfe-flexible';
import 'vant/lib/index.css';
// import 'vant/es/notify/style';
// import 'vant/es/toast/style';
// import 'vant/es/dialog/style';
import '@/styles/index.less';

const app = createApp(App);

app.config.globalProperties.$openMapDialog = createMapDialog(app);
app.config.globalProperties.$closeMapDialog = destroyAllMapDialog;

app.use(router);
app.mount('#app');
