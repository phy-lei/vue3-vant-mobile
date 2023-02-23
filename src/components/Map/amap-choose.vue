<template>
  <view class="amap-choose">
    <view class="top-button">
      <text class="cancel" @click="toCancel">取消</text>
      <text class="conform" :style="{ backgroundColor: color }" @click="confirm">完成</text>
    </view>
    <view class="map-box">
      <view id="map"></view>
    </view>
    <view class="content">
      <view class="search">
        <van-search
          v-model="keyword"
          placeholder="搜索地点"
          style="width: 100%"
          @input="inputValue"
          @cancel="cancel"
        />
      </view>
      <view class="main">
        <view v-for="(item, index) in list" :key="index" class="list-item" @click="toChecked(item)">
          <view class="list-item-left">
            <view>{{ item.name }}</view>
            <view class="detail">
              {{ item.district }}{{ item.address ? '-' + item.address : '' }}
            </view>
          </view>
          <view>
            <text v-if="item.location === checked.location" :style="{ color }">√</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    color: {
      type: String,
      default: '#ff6000',
    },
    keyMap: {
      type: String,
      default: '',
    },
    AMapKeyWeb: {
      type: String,
      default: '',
    },
    initLocation: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    destroy: {
      type: Function,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      keyword: '',
      timeId: null,
      checked: {
        locaiton: '',
      },
      showPlace: false,
    };
  },
  watch: {
    show(newVal, oldVal) {
      this.showPlace = newVal;
      this.$nextTick(() => {
        this.loop();
      });
    },
  },
  mounted() {
    this.showPlace = this.show;
    // this.initMapWeb();
    var script = document.getElementById('mapTest');
    let that = this;
    script
      ? this.loop()
      : (function () {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.setAttribute('id', 'mapTest');
          script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${that.keyMap}`;
          document.body.appendChild(script);
          that.loop();
        })();
  },
  methods: {
    loop() {
      try {
        this.initMapWeb();
      } catch (e) {
        setTimeout(() => this.loop(), 200);
      }
    },

    inputValue(e) {
      if (this.timeId) {
        clearTimeout(this.timeId);
      }

      this.timeId = setTimeout(() => {
        this.getPlaces(this.keyword, '');
        this.timeId = null;
      });
    },

    cancel() {
      this.keyword = '';
      this.list = [];
      if (this.maker) {
        this.marker.setMap(null);
      }
    },

    toCancel() {
      // this.showPlace = false;
      // this.cancel();
      // this.$emit('changeShow', false);
      this.destroy();
    },

    //完成
    confirm() {
      if (this.checked) {
        let address;
        if (this.checked.addressLocal) {
          address = this.checked.addressLocal;
        } else {
          address = `${this.checked.district}${
            this.checked.address ? '-' + this.checked.address : ''
          }`;
        }

        // let location = this.checked.location.split(',');

        // this.$emit('placeChoose', {
        //   address,
        //   adcode: this.checked.adcode,
        //   latitude: location[1],
        //   longitude: location[0],
        // });

        this.cancel();

        this.destroy({
          address,
          adcode: this.checked.adcode,
          location: this.checked.location,
        });
      }
    },

    toChecked(obj) {
      console.log(
        '%c [ xxx ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        obj,
        this.marker
      );
      this.checked = obj;
      let tempArr = obj.location.split(',');
      if (this.marker) {
        this.marker.setMap(null);

        this.addMarker(tempArr[0], tempArr[1]);
      }
      // this.map.setCenter(tempArr[0], tempArr[1]);
    },

    initMapWeb() {
      let that = this;
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13,
      });
      console.log('%c [ this.map ]', 'font-size:13px; background:pink; color:#bf2c9f;', this.map);

      this.map.on('click', (e) => {
        if (this.marker) {
          this.marker.setMap(null);
        }
        that.addMarker(e.lnglat.lng, e.lnglat.lat);
        that.getPlaces('', `${e.lnglat.lng}, ${e.lnglat.lat}`);
        that.getNowPlace(`${e.lnglat.lng}, ${e.lnglat.lat}`);
      });

      if (this.initLocation.length > 0) {
        let tempArr = this.initLocation.split(',');
        that.addMarker(tempArr[0], tempArr[1]);
        that.getPlaces('', `${tempArr[0]}, ${tempArr[1]}`);
        that.getNowPlace(`${tempArr[0]}, ${tempArr[1]}`);
        return;
      }

      AMap.plugin('AMap.Geolocation', function () {
        // var geolocation = new AMap.Geolocation({
        //   // 是否使用高精度定位，默认：true
        //   enableHighAccuracy: true,
        //   // 设置定位超时时间，默认：无穷大
        //   timeout: 10000,
        //   // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        //   buttonOffset: new AMap.Pixel(10, 20),
        //   //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //   zoomToAccuracy: true,
        //   //  定位按钮的排放位置,  RB表示右下
        //   buttonPosition: 'RB',
        // });
        // geolocation.getCurrentPosition(function (status, result) {
        //   if (result.info == 'SUCCESS' && result.position && result.position) {
        //     that.addMarker(result.position.lng, result.position.lat);
        //     that.getPlaces('', `${result.position.lng}, ${result.position.lat}`);
        //     that.getNowPlace(`${result.position.lng}, ${result.position.lat}`);
        //   }
        // });
      });
    },

    getNowPlace(location) {
      axios
        .get(
          `https://restapi.amap.com/v3/geocode/regeo?key=${this.AMapKeyWeb}&location=${location}`
        )
        .then((res) => {
          let result = res.data;
          if (result.status == '1') {
            let tempObj = result.regeocode;
            this.checked = {
              adcode: tempObj.addressComponent.adcode,
              city: tempObj.addressComponent.city,
              district: tempObj.addressComponent.district,
              location,
              addressLocal: tempObj.formatted_address,
            };
          }
        });
    },

    addMarker(lng, lat) {
      var icon = new AMap.Icon({
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(32, 42),
      });

      this.marker = new AMap.Marker({
        icon,
        position: [lng, lat],
      });

      this.marker.setMap(this.map);
      this.map.setCenter([lng, lat]);
    },

    getPlaces(keywords, location) {
      axios
        .get(
          `https://restapi.amap.com/v3/assistant/inputtips?key=${this.AMapKeyWeb}&keywords=${keywords}&location=${location}`
        )
        .then((res) => {
          let result = res.data;
          if (result.status === '1') {
            this.list = result.tips.filter((item) => item.location && item.location.length > 0);
            // console.log(this.list, result.tips)
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.amap-choose {
  font-size: 14px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  .top-button {
    top: 0;
    box-sizing: border-box;
    padding: 24px;
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    .cancel {
      // color: white;
      // color: white;
      padding: 8px 14px;
      border-radius: 8px;
      background-color: rgb(177 174 174 / 80%);
    }
    .conform {
      // background-color: #ff6000;
      color: white;
      padding: 8px 14px;
      border-radius: 8px;
    }
  }

  .map-box {
    width: 100%;
    height: 60%;
    #map {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    :deep(.amap-logo) {
      display: none !important;
    }
    :deep(.amap-copyright) {
      display: none !important;
    }
  }

  .content {
    position: fixed;
    bottom: 0;
    border-radius: 24px 24px 0 0;
    height: 42%;
    width: 100%;
    background: white;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .search {
      width: 100%;
      height: 64px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .main {
      margin-top: 20px;
      height: calc(100% - 88px);
      // height: 100px;
      // background: pink;
      overflow-y: auto;
      .list-item {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-left {
          display: flex;
          flex-direction: column;
        }
        .detail {
          color: #707070;
        }
      }
    }
  }
}
</style>
