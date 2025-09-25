<template>
  <div>
    <div style="font-size: 30px; margin-top: 20px">WebCodecsPlayer</div>
    <div style="margin: 12px 0">
      <input style="padding: 6px" id="input" type="text" v-model="url" placeholder="https://xxxx.flv" />
    </div>
    <div style="margin: 10px 0; display: flex; gap: 12px; justify-content: center">
      <button @click="changeUrl">Other</button>
      <button @click="play">Start</button>
      <button @click="stop">Stop</button>
    </div>
    <div class="play-view">
      <div class="canvas-video-frame">
        <div class="title">VideoFrame</div>
        <div id="canvas-view" style="background-color: antiquewhite"></div>
      </div>
      <div class="video-media-stream">
        <div class="title">MediaStream</div>
        <div id="video-view" style="background-color: brown"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { PrWebCodecsPlayer } from '../../src/PrWebCodecsPlayer.ts'

const url = ref('https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv')

const player = new PrWebCodecsPlayer()

const init = async () => {
  await nextTick()

  const canvas_view = document.querySelector('#canvas-view')
  const video_view = document.querySelector('#video-view')

  if (!canvas_view || !video_view) return

  const canvas_dom = document.createElement('canvas')
  canvas_dom.style.width = '100%'
  canvas_dom.style.height = '100%'
  canvas_view.replaceChildren(canvas_dom)

  const video_dom = document.createElement('video')
  video_dom.style.width = '100%'
  video_dom.style.height = '100%'
  video_dom.style.objectFit = 'cover'
  video_view.replaceChildren(video_dom)

  const stream = await player.init({ canvas: canvas_dom })
  video_dom.srcObject = stream
  video_dom?.load()
  await nextTick()
  video_dom?.play()
}

const changeUrl = () => {
  url.value = 'https://stream.quickvo.live/stream_8054007535/1758792512493.flv?auth_key=1758878912-0-0-4a73cf4fdd986d782f520cf27e9dfc25'
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
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 20px;
  line-height: 40px;
}

#canvas-view canvas {
  width: 100%;
  height: 100%;
}

#canvas-view,
#video-view {
  width: 100%;
  height: 100%;
}
</style>
