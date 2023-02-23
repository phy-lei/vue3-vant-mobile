import { reactive, defineComponent, onMounted } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis } from '@antv/f2';

export default defineComponent({
  name: 'App',
  setup() {
    const data1 = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const data2 = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 20 },
      { genre: 'Shooter', sold: 50 },
      { genre: 'Other', sold: 50 },
    ];
    const data = reactive({
      year: '2021',
      chartData: data1,
    });
    onMounted(() => {
      setTimeout(() => {
        data.year = '2022';
        data.chartData = data2;
      }, 1000);
    });
    return () => (
      <div className="container">
        <Canvas pixelRatio={window.devicePixelRatio}>
          <Chart data={data.chartData}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      </div>
    );
  },
});
