import flvParser, { isH264AnnexB } from './flvParser'
import { Header, Options, TagType } from './type'

export class FlvDemuxer {
  private pushFuncs: Function[] = []
  private payload = new Uint8Array(0)
  private offset = 0
  private is_parsing = false // 是否正在解析
  private header: Header | undefined
  private tag: any

  private onHeader
  private onTag

  debug = false

  parseTimer = 0

  constructor({ onHeader, onTag, debug = false }: Options) {
    this.onHeader = onHeader
    this.onTag = onTag
    this.debug = debug
  }

  init = () => {
    this.pushFuncs = []
    this.payload = new Uint8Array(0)
    this.offset = 0
    this.is_parsing = false
    this.header = undefined
    this.tag = undefined
    this.parseTimer = setInterval(this.parse, 40)
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->FlvDemuxer: init`)
    }
  }

  destroy = () => {
    this.pushFuncs = []
    this.payload = new Uint8Array(0)
    this.offset = 0
    this.is_parsing = false
    this.header = undefined
    this.tag = undefined
    clearInterval(this.parseTimer)
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->FlvDemuxer: destroy`)
    }
  }

  push = (payload: Uint8Array) => {
    const func = () => {
      // 合并数据
      const _payload = new Uint8Array(this.payload.byteLength + payload.byteLength)
      _payload.set(this.payload, 0)
      _payload.set(payload, this.payload.byteLength)
      this.payload = _payload
    }
    this.pushFuncs.push(func)
  }

  private parse = async () => {
    if (this.pushFuncs.length === 0 || this.is_parsing === true) return

    this.is_parsing = true

    {
      const pushFunc = this.pushFuncs.shift()
      pushFunc && pushFunc()
    }

    // const a = isH264AnnexB(this.payload)
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: isH264AnnexB`, a)

    const view = new DataView(this.payload.buffer)

    if (!this.header) {
      this.parseHeader(view)
    }
    await this.parseTag(view)

    this.is_parsing = false
  }

  private parseHeader = (view: DataView) => {
    this.header = {
      signature: flvParser.header.getSignature(view),
      version: flvParser.header.getVersion(view),
      flags: flvParser.header.getFlags(view),
      dataOffset: flvParser.header.getDataOffset(view)
    }
    this.offset = this.header?.dataOffset
    this.onHeader && this.onHeader(this.header)
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->FlvDemuxer: header`, this.header)
    }
    return this.header
  }

  private parseTag = async (view: DataView) => {
    const parseTagHeader = (view: DataView, offset: number) => {
      const obj = {
        tagType: flvParser.tag.tagHeader.getTagType(view, offset),
        dataSize: flvParser.tag.tagHeader.getDataSize(view, offset),
        timestamp: flvParser.tag.tagHeader.getTimestamp(view, offset),
        timestampExtended: flvParser.tag.tagHeader.getTimestampExtended(view, offset),
        streamID: flvParser.tag.tagHeader.getStreamID(view, offset)
      }
      if (this.debug) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->FlvDemuxer: parseTagHeader`, obj)
      }
      return obj
    }

    const parseTagBody = (tagType: TagType, view: DataView, offset: number, dataSize: number) => {
      let tagBody

      switch (tagType) {
        case 'script':
          {
            tagBody = flvParser.tag.tagBody.parseMetaData(view, offset, dataSize)
          }
          break
        case 'audio':
          {
            tagBody = flvParser.tag.tagBody.parseAudio(view, offset, dataSize)
          }
          break

        case 'video':
          {
            tagBody = flvParser.tag.tagBody.parseVideo(view, offset, dataSize)
          }
          break
      }
      if (this.debug) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->FlvDemuxer: parseTagBody`, tagBody)
      }
      return tagBody
    }
    while (this.offset < view.byteLength) {
      const isSurplus = flvParser.checkSurplus(view, this.offset)
      if (isSurplus === false) {
        this.payload = this.payload.slice(this.offset) // 从上次header前截取
        this.offset = 0 // 重置为0
        break
      }

      const tagHeader = parseTagHeader(view, this.offset + 4) // previousTagSize(4)

      const { tagType, dataSize } = tagHeader

      const tagBody = parseTagBody(tagType, view, this.offset + 4 + 11, dataSize) // previousTagSize(4) tagHeader(11)

      this.tag = { header: tagHeader, body: tagBody }
      if (tagHeader.tagType !== 'audio') {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: tag.${tagHeader.timestamp}`, tagBody)
      }
      this.onTag && this.onTag(this.tag)

      this.offset = this.offset + 4 + 11 + dataSize // previousTagSize(4) tagHeader(11) tagBody(dataSize)
      await new Promise((resolve) => setTimeout(() => resolve(true), 100))
    }
  }
}
