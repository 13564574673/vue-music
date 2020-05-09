<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dota" v-for="(item,index) in dots" :key="index" :class="{active :currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'
export default {
  name: 'Slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    // 轮播图滚动
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      // console.log(this.children)
      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // console.log(width)
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
        // console.log(width)
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 定义轮播图圆点
    _initDots () {
      this.dots = new Array(this.children.length)
      console.log(this.dots)
    },
    // 轮播图滚动圆点切换
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop, // 循环
          threshold: 0.3,
          speed: 400 // 轮播间隔
        },
        click: true
      })
      this.slider.on('scrollEnd', () => {
        const pageIndex = this.slider.getCurrentPage().pageX
        // console.log(pageIndex)
        this.currentPageIndex = pageIndex
        console.log(this.autoPlay)
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 自动播放
    _play () {
      // const pageIndex = this.currentPageIndex + 1
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~assets/stylus/variable';
.slider{
  min-height: 1px;;
  .slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item{
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a{
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .dots{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    font-size: 0;
    text-align: center;
    .dota{
      display: inline-block;
      width: 8px;
      height: 8px;
      margin:0 4px;
      border-radius: 50%;
      background-color: $color-text-l;
      &.active{
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
