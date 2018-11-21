define([
  'vue'
], function(Vue) {
  Vue.component('slider', {
    template: `
      <div class="slider" ref="mySlider">
        <div class="left-btn" @touchstart.prevent="btnFun(2)">
          <span class="text">{{maxT}}</span>
          <span class="s-sliderBlock"></span>
        </div>
        <div class="propo"></div>
        <div class="propo-bg"></div>
        <div class="right-btn" @touchstart.prevent="btnFun(1)">
          <span class="text">{{minT}}</span>
          <span class="s-sliderBlock"></span>
        </div>
      </div>
    `,
    props: {
      "valueFun": {
        type: Function,
        required: true,
      },
      "max": {
        type: Number,
        default: 100
      },
      "min": {
        type: Number,
        default: 0
      },
      "maxText": {
        type: String,
        default: '100'
      },
      "minText": {
        type: String,
        default: '0'
      }
    },
    data () {
      return {
        myPosition: {
          left: 0,
          right: 0,
          now: 0,
          isBtn: 0,
          propoWidth: 0
        },
        myDefault: null,
        minT: 0,
        maxT: 100
      }
    },
    created () {
      this.minT = this.minText;
      this.maxT = this.maxText;
    },
    mounted() {
      //滑块
      let that = this
      let mySlider = this.$refs.mySlider
      let propo = mySlider.children[1]
      let rightBtn = mySlider.children[3]
      let leftBtn = mySlider.children[0]
      let myWidth = 0
      const multiple = Number(this.maxText)/100;

      const elementLeft = (e) => { //计算x坐标
        var offset = e.offsetLeft;
        
        if (e.offsetParent != null) {
          if (!e.offsetParent.classList.contains('van-popup')) {
            offset += elementLeft(e.offsetParent);
          }
        }
        return offset;
      }

      const myCount = () => { //计算滑动
        if (this.myPosition.right > this.myPosition.left) { //判断滑动范围
          this.myPosition.propoWidth = this.myPosition.right - this.myPosition.left
          propo.style.width = this.myPosition.propoWidth + '%'
          propo.style.left = this.myPosition.left + '%'
          this.minT = parseInt(this.myPosition.left) * multiple
          this.maxT = parseInt(this.myPosition.right) * multiple
          this.valueFun(parseInt(this.myPosition.left) * multiple, parseInt(this.myPosition.right) * multiple, parseInt(this.myPosition.propoWidth) * multiple)
        } else if (this.myPosition.right < this.myPosition.left) {
          this.myPosition.propoWidth = this.myPosition.left - this.myPosition.right
          propo.style.width = this.myPosition.propoWidth + '%'
          propo.style.left = this.myPosition.right + '%'
          this.minT = parseInt(this.myPosition.left) * multiple
          this.maxT = parseInt(this.myPosition.right) * multiple
          this.valueFun(parseInt(this.myPosition.right) * multiple, parseInt(this.myPosition.left) * multiple, parseInt(this.myPosition.propoWidth) * multiple)
        } else if (this.myPosition.right == this.myPosition.left) {//按钮位置滑到最大值或者最小值
          this.myPosition.propoWidth = this.myPosition.left - this.myPosition.right
          propo.style.width = this.myPosition.propoWidth + '%'
          propo.style.left = this.myPosition.right + '%'
          this.minT = parseInt(this.myPosition.left) * multiple
          this.maxT = parseInt(this.myPosition.right) * multiple
          this.valueFun(parseInt(this.myPosition.right) * multiple, parseInt(this.myPosition.left) * multiple, parseInt(this.myPosition.propoWidth) * multiple)
        }

      }

      this.myDefault = () => {//初始化
        this.myPosition.right = this.max
        this.myPosition.left = this.min

        if (this.max > this.min) {
          this.myPosition.propoWidth = this.max - this.min
          propo.style.left = this.myPosition.left + '%'
        } else {
          this.myPosition.propoWidth = this.min - this.max
          propo.style.left = this.myPosition.right + '%'
        }

        propo.style.width = this.myPosition.propoWidth + '%'
        leftBtn.style.left = this.myPosition.right + '%'
        rightBtn.style.left = this.myPosition.left + '%'
        this.minT = parseInt(this.myPosition.left) * multiple
        this.maxT = parseInt(this.myPosition.right) * multiple
        this.valueFun(this.myPosition.left * multiple, this.myPosition.right * multiple, this.myPosition.propoWidth * multiple)
      }

      let mySliderX = elementLeft(mySlider) //滑动块x坐标

      mySlider.addEventListener('touchmove', (e) => { //屏幕滑动事件
        let pageX = e.touches[0].pageX - mySliderX //获取滑动x坐标
        myWidth = (pageX / mySlider.offsetWidth) * 100 //计算百分比
        if (myWidth > 100) { //判断不超出范围
          myWidth = 100
        } else if (myWidth < 0) {
          myWidth = 0
        }
        if (this.myPosition.isBtn == 1) {//判断焦点
          this.myPosition.left = myWidth
          rightBtn.style.left = myWidth + '%'
        } else if (this.myPosition.isBtn == 2) {
          this.myPosition.right = myWidth
          leftBtn.style.left = myWidth + '%'
        }
        myCount()
        e.preventDefault()

      })

      mySlider.addEventListener('touchstart', (e) => {//屏幕触摸事件
        let touchX = e.touches[0].pageX - mySliderX;
        let btnWidth = (leftBtn.offsetWidth / mySlider.offsetWidth) / 2 * 100 //计算按钮宽度
        this.myPosition.now = (touchX / mySlider.offsetWidth) * 100
        mySliderX = elementLeft(mySlider) //滑动块x坐标
        // if(this.myPosition.now <= this.myPosition.left+btnWidth&&this.myPosition.now >= this.myPosition.left-btnWidth){ //计算区间 获取焦点
        // 	this.myPosition.isBtn = 1
        // }else if(this.myPosition.now <= this.myPosition.right+btnWidth&&this.myPosition.now >= this.myPosition.right-btnWidth){
        // 	this.myPosition.isBtn = 2
        // }else{
        // 	this.myPosition.isBtn = 0
        // }
      })

      this.myDefault()
    },
    methods: {
      btnFun(index) {
        this.myPosition.isBtn = index
      }
    },
    watch: {
      min(New, old) {
        this.myDefault()
      },
      max(New, old) {
        this.myDefault()
      }
    }
  })
});