<template>
  <div class="recommend">
    <div class="recommend-content">
        <div class="slider-wrapper" v-if="banners.length > 0">
          <slider>
            <div v-for="(item,index) in banners" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Slider from '@/base/slider/Slider'

import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
export default {
  name: 'Recommend',
  data () {
    return {
      banners: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    // 获取数据
    _getRecommend () {
      getRecommend().then((res) => {
        // console.log(res)
        if (res.code === ERR_OK) {
          // console.log(res)
          this.banners = res.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/stylus/variable";
  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
      height: 100%;
      overflow: hidden;
      .slider-wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list{
        .list-title{
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
      }
    }
  }
</style>
