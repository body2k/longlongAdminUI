<template>
  <div id="longAudio">
    <div>
      <!--      <div @click="abc">aaa</div>-->
      <!--      <div class="progress" ref="progress">-->
      <!--        <div class="currentProgress" ref="currentProgress">-->
      <!--          <span class="circle" ref="circle"></span>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="time">-->
      <!--        <span class="startTime">{{ audioCurrentTime }}</span>/-->
      <!--        <span class="endTime">{{ audioDuration }}</span>-->
      <!--      </div>-->


      <audio controls :src="audio.audioUrl" id="longAudioPlay" ref="audio" @timeupdate="updateAudioProgress"></audio>
      <div class="audioDiv">
        <!-- 音乐封面        -->
        <img v-if="imageLoaded" @load="imageLoaded = true"
             :src="audio.imageUrl"
             :class="rotateLoaded?'audioImage audioImageTurn':'audioImage audioImageFalse'">
        <img src="../assets/audio/png/audio.jpg" v-else class="audioImage"
             :class="rotateLoaded?'audioImage audioImageTurn':'audioImage audioImageFalse'"></img>
        <div class="audioControl">
          <el-icon @click="audioLeftClick">
            <CaretLeft/>
          </el-icon>
          <el-icon @click="longAudioPlay" v-if="!rotateLoaded">
            <VideoPlay/>
          </el-icon>
          <el-icon @click="longAudioPause" v-else>
            <VideoPause/>
          </el-icon>
          <el-icon @click="audioRightClick">
            <CaretRight/>
          </el-icon>
          <el-icon style="margin-right: 10px">
            <Headset/>
          </el-icon>
          <div class="audioTitleWrap">
            <div class="audioTitle">
              {{ audio.audioName }}<span class="audioAuthor"
                                         v-if="audio.audioAuthor">-&nbsp;{{ audio.audioAuthor }}</span>
            </div>
          </div>
          <el-icon :class="audioListLoaded?'audioListClick':'audioListOnClick'"
                   @click="audioListClick">
            <Fold/>
          </el-icon>
        </div>
      </div>

      <div class="audioList" v-if="audioListLoaded">
        <span class="pointTo"></span>

        <div class="audioListControl">
          <el-row style="margin-left: 5px;color: rgba(177,177,177)">
            <el-col :span="16">歌曲</el-col>
            <el-col :span="8"> 歌手</el-col>
          </el-row>
          <el-row v-for="item in audioDate" class="audioListItem" @click="audioClick(item)">
            <el-col :span="16"> {{ item.audioName }}</el-col>
            <el-col :span="8"> {{ item.audioAuthor }}</el-col>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>
<!--音频-->
<script>
import international from '../assets/audio/中国人民解放军军乐团 - 国际歌 (合唱版).ogg';
import orientalRed from '../assets/audio/东方红.ogg';
import {Home} from '@/ui'

export default {
  props: {
    audioDate: {
      type: Array,
      default: [
        {
          imageUrl: "https://ts2.cn.mm.bing.net/th?id=OPAC.sp%2BBqEqlb15G9w474C474&pcl=f5f5f5",
          audioUrl: international,
          audioName: "国际歌",
          audioAuthor: "劳动人民"
        }
      ]
    },
  },
  data() {
    return {
      audioDuration: 0,
      audioProgressBar: 0,
      audioCurrentTime: 0,
      home: Home,
      audioIndex: 1,
      audio: this.audioDate[0],
      rotateLoaded: false,
      imageLoaded: true,
      audioListLoaded: false,
    }
  }, methods: {
    updateAudioProgress() {
      const audio = this.$refs.audio;
      this.audioCurrentTime = audio.currentTime;
      if (audio.currentTime === this.audioDuration) {
        this.audioRightClick();
      }
    },
    audioClick(item) {
      this.audio = item;
      this.$nextTick(() => {
        this.longAudioPlay()
      })
    },
    //上一首
    audioLeftClick() {
      if (this.audioIndex > 1) {
        this.audioIndex--
        this.audio = this.audioDate[this.audioIndex - 1]
        this.$nextTick(() => {
          this.longAudioPlay()

        })
      } else {
        this.audioIndex = this.audioDate.length
        this.audio = this.audioDate[this.audioIndex - 1]
        this.$nextTick(() => {
          this.longAudioPlay()

        })
      }
    },
    //下一首
    audioRightClick() {
      if (this.audioIndex < this.audioDate.length) {
        this.audioIndex++
        this.audio = this.audioDate[this.audioIndex - 1]
        this.$nextTick(() => {
          this.longAudioPlay()
        })
      } else {
        this.audioIndex = 1
        this.audio = this.audioDate[this.audioIndex - 1]
        this.$nextTick(() => {
          this.longAudioPlay()
        })
      }
    },
    //打开音乐列表
    audioListClick() {
      this.audioListLoaded = !this.audioListLoaded
    },
    //暂停
    longAudioPause() {
      this.$refs.audio.pause()
      this.rotateLoaded = false
    },
    //播放
    async longAudioPlay() {
      await this.$refs.audio.play()

      await this.$nextTick(() => {
        this.rotateLoaded = true
        this.audioDuration = this.$refs.audio.duration
        this.audioProgressBar = 0
      })

    }, abc() {
      this.$nextTick().then(() => {
        console.log(this.$refs.audio.duration
        )
      })
    }
  }, mounted() {
    this.$nextTick(function () {
      this.abc();
    })
  }
}
</script>
<style scoped>
.audioListOnClick {
  margin-left: 10px;
}

.audioListClick {
  margin-left: 10px;
  color: v-bind('home.audioColor');

}

/* 旋转动画 指定class为trun即可使用*/
.audioImageTurn {
  animation: audioImageTurn 10s linear infinite;
}

.audioImageFalse {
  animation: audioImageFalse 3s linear infinite;
}

@keyframes audioImageFalse {
  100% {
    transform: rotate(0deg);
  }
}

@keyframes audioImageTurn {
  0% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(72deg);
  }

  40% {
    transform: rotate(144deg);
  }

  60% {
    transform: rotate(216deg);
  }

  80% {
    transform: rotate(288deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#longAudioPlay {
  display: none;
}

.audioDiv {
  display: flex;
  width: 350px;
  border-radius: 50px;
  background-color: white;
  height: 50px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}

.audioImage {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: darkgrey;
}

.audioControl {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
}

.audioControl .el-icon {
  font-size: 30px !important;
}

.audioControl .el-icon:hover {
  color: v-bind('home.audioColor');
  cursor: pointer;

}

.audioList {
  border-radius: 5px;
}

.plusIcon-enter-active,
.plusIcon-leave-active {
}

.plusIcon-enter,
.plusIcon-leave-to {
}

.audioTitleWrap {
  margin-top: 5px;
  overflow: hidden;
  width: 120px;
  height: 20px;
  float: left;
  white-space: nowrap;

}

.audioTitle {
  float: left;
  white-space: nowrap;
  animation: marquee-content 8s infinite linear;

}

@keyframes marquee-content {
  10% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-20%);
  }
  90% {
    transform: translateX(0);
  }
}

.audioAuthor {
  margin-left: 10px;
  color: darkgrey;
}

.audioList {
  height: 200px;
  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  margin-top: 20px;
  width: 450px;
  position: absolute;
  z-index: 9999;
}

.pointTo {
  height: 10px;
  width: 10px;
  top: -5px;
  z-index: -1;
  position: absolute;
  left: 317px;
  background-color: white;
  transform: rotate(144deg);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.12);
}

.audioListItem {
  color: black;
  height: 30px;
  padding-top: 5px;
  padding-left: 5px;

}

.audioListItem:hover {
  color: v-bind('home.audioColor');;
  cursor: pointer;
  background-color: rgb(235, 235, 235);
  padding-top: 5px;
  border-radius: 5px;
}

.audioListControl {
  margin: 10px;
  overflow: auto;
  height: 180px
}
</style>