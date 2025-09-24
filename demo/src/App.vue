<template>
  <div>
    <div style="font-size: 30px; margin-top: 20px">WebCodecsPlayer</div>
    <div style="margin: 12px 0">
      <input style="padding: 6px" id="input" type="text" v-model="url" placeholder="https://xxxx.flv" />
    </div>
    <div style="margin: 10px 0; display: flex; gap: 12px; justify-content: center">
      <button @click="play">start</button>
      <button @click="stop">stop</button>
    </div>
    <div class="play-view">
      <div class="canvas-video-frame">
        <div class="title">VideoFrame</div>
        <canvas ref="canvasRef" style="background-color: antiquewhite"></canvas>
      </div>
      <div class="video-media-stream">
        <div class="title">MediaStream</div>
        <video ref="videoRef" style="background-color: brown"></video>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { PrWebCodecsPlayer } from '../../src/PrWebCodecsPlayer.ts'

const url = ref('https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv')

const canvasRef = ref<HTMLCanvasElement>()
const videoRef = ref<HTMLVideoElement>()

// url.value = 'https://stream.quickvo.live/stream_8054007535/1758596620533.flv?auth_key=1758683020-0-0-51047f654d7a94eab237fb896ed8d57c'

let player: PrWebCodecsPlayer

const init = async () => {
  await nextTick()
  if (!videoRef.value || !canvasRef.value) return
  player = new PrWebCodecsPlayer()
  const stream = await player.init({ canvas: canvasRef.value })
  videoRef.value.srcObject = stream
  videoRef.value?.load()
  await nextTick()
  videoRef.value?.play()
}

const play = async () => {
  await init()
  player.start(url.value)
}

const stop = () => {
  player.stop()
}
</script>
<style scoped>
.play-view {
  position: relative;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
}

.canvas-video-frame,
.video-media-stream {
  flex: 1;
  min-width: 320px;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

canvas,
video {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 20px;
  line-height: 40px;
}
</style>
