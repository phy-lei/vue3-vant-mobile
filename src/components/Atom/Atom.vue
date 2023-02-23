<template>
  <div class="atom">
    <van-search v-model="keyword" :placeholder="placeholder" @search="$emit('search', keyword)" />
    <van-tabs v-model:active="active" color="#427CE9" @change="$emit('change', $event)">
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.title"
        :name="item.status"
      >
        <div class="wrap">
          <van-list
            v-if="item.list.length"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="reachBottom"
          >
            <Card v-for="(order, index) in item.list" :key="index">
              <slot :name="item.name" :data="order" :index="index"></slot>
            </Card>
          </van-list>

          <Empty v-else :text="item.emptyText"></Empty>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, PropType } from 'vue';
import Card from '../Card/Card.vue';
import Empty from '@/components/Empty/Empty.vue';

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  tabList: {
    type: Array as PropType<
      {
        name: string;
        title: string;
        emptyText: string;
        list: any[];
        status: string | number;
      }[]
    >,
    default: () => [],
  },
});

const emit = defineEmits(['change', 'reachBottom', 'search']);

const keyword = ref('');
const active = ref('');
const loading = ref(false);
const finished = ref(false);

const reachBottom = () => {
  emit(
    'reachBottom',
    (isLoading: boolean) => {
      loading.value = isLoading;
    },
    (isComplete: boolean) => {
      finished.value = isComplete;
    }
  );
};
</script>
<style lang="less" scoped>
.atom {
  height: 100vh;
  background: @gray;
  .wrap {
    overflow-y: auto;
    height: calc(100vh - var(--van-tabbar-height) - var(--van-search-input-height));
    padding-bottom: @safe-bottom;
  }
}
</style>
