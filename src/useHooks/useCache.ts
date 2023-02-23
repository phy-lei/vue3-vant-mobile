import { ref } from 'vue'

// 全局的缓存页面组件状态 {组件名: 时间戳} 
// 利用时间戳作为component key 可以保证缓存组件的更新
const kEEP_ALIVE_MAP = ref(new Map([]))

export default () => {

  // 遵守软件设计开闭原则 不在外层修改 暂时不使用ts约束 后续有时间再更改
  const setKeepAlive = (key: string, value: number) => {
    kEEP_ALIVE_MAP.value.set(key, value)
  }


  return {
    kEEP_ALIVE_MAP,
    setKeepAlive,
  }
}