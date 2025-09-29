/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/minimal'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const com = ($root.com = (() => {
  /**
   * Namespace com.
   * @exports com
   * @namespace
   */
  const com = {}

  com.quick = (function () {
    /**
     * Namespace quick.
     * @memberof com
     * @namespace
     */
    const quick = {}

    quick.voice = (function () {
      /**
       * Namespace voice.
       * @memberof com.quick
       * @namespace
       */
      const voice = {}

      voice.proto = (function () {
        /**
         * Namespace proto.
         * @memberof com.quick.voice
         * @namespace
         */
        const proto = {}

        proto.SeiData = (function () {
          /**
           * Properties of a SeiData.
           * @memberof com.quick.voice.proto
           * @interface ISeiData
           * @property {com.quick.voice.proto.EventType|null} [event] SeiData event
           * @property {Uint8Array|null} [data] SeiData data
           * @property {boolean|null} [compress] SeiData compress
           * @property {number|null} [version] SeiData version
           */

          /**
           * Constructs a new SeiData.
           * @memberof com.quick.voice.proto
           * @classdesc Represents a SeiData.
           * @implements ISeiData
           * @constructor
           * @param {com.quick.voice.proto.ISeiData=} [properties] Properties to set
           */
          function SeiData(properties) {
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * SeiData event.
           * @member {com.quick.voice.proto.EventType} event
           * @memberof com.quick.voice.proto.SeiData
           * @instance
           */
          SeiData.prototype.event = 0

          /**
           * SeiData data.
           * @member {Uint8Array} data
           * @memberof com.quick.voice.proto.SeiData
           * @instance
           */
          SeiData.prototype.data = $util.newBuffer([])

          /**
           * SeiData compress.
           * @member {boolean} compress
           * @memberof com.quick.voice.proto.SeiData
           * @instance
           */
          SeiData.prototype.compress = false

          /**
           * SeiData version.
           * @member {number} version
           * @memberof com.quick.voice.proto.SeiData
           * @instance
           */
          SeiData.prototype.version = 0

          /**
           * Creates a new SeiData instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {com.quick.voice.proto.ISeiData=} [properties] Properties to set
           * @returns {com.quick.voice.proto.SeiData} SeiData instance
           */
          SeiData.create = function create(properties) {
            return new SeiData(properties)
          }

          /**
           * Encodes the specified SeiData message. Does not implicitly {@link com.quick.voice.proto.SeiData.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {com.quick.voice.proto.ISeiData} message SeiData message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          SeiData.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.event != null && Object.hasOwnProperty.call(message, 'event')) writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.event)
            if (message.data != null && Object.hasOwnProperty.call(message, 'data')) writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.data)
            if (message.compress != null && Object.hasOwnProperty.call(message, 'compress')) writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.compress)
            if (message.version != null && Object.hasOwnProperty.call(message, 'version')) writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.version)
            return writer
          }

          /**
           * Encodes the specified SeiData message, length delimited. Does not implicitly {@link com.quick.voice.proto.SeiData.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {com.quick.voice.proto.ISeiData} message SeiData message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          SeiData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes a SeiData message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.SeiData} SeiData
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          SeiData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.SeiData()
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.event = reader.int32()
                  break
                }
                case 2: {
                  message.data = reader.bytes()
                  break
                }
                case 3: {
                  message.compress = reader.bool()
                  break
                }
                case 4: {
                  message.version = reader.int32()
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes a SeiData message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.SeiData} SeiData
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          SeiData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies a SeiData message.
           * @function verify
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          SeiData.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            if (message.event != null && message.hasOwnProperty('event'))
              switch (message.event) {
                default:
                  return 'event: enum value expected'
                case 0:
                case 1:
                  break
              }
            if (message.data != null && message.hasOwnProperty('data')) if (!((message.data && typeof message.data.length === 'number') || $util.isString(message.data))) return 'data: buffer expected'
            if (message.compress != null && message.hasOwnProperty('compress')) if (typeof message.compress !== 'boolean') return 'compress: boolean expected'
            if (message.version != null && message.hasOwnProperty('version')) if (!$util.isInteger(message.version)) return 'version: integer expected'
            return null
          }

          /**
           * Creates a SeiData message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.SeiData} SeiData
           */
          SeiData.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.SeiData) return object
            let message = new $root.com.quick.voice.proto.SeiData()
            switch (object.event) {
              default:
                if (typeof object.event === 'number') {
                  message.event = object.event
                  break
                }
                break
              case 'Layout':
              case 0:
                message.event = 0
                break
              case 'Custom':
              case 1:
                message.event = 1
                break
            }
            if (object.data != null)
              if (typeof object.data === 'string') $util.base64.decode(object.data, (message.data = $util.newBuffer($util.base64.length(object.data))), 0)
              else if (object.data.length >= 0) message.data = object.data
            if (object.compress != null) message.compress = Boolean(object.compress)
            if (object.version != null) message.version = object.version | 0
            return message
          }

          /**
           * Creates a plain object from a SeiData message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {com.quick.voice.proto.SeiData} message SeiData
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          SeiData.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.defaults) {
              object.event = options.enums === String ? 'Layout' : 0
              if (options.bytes === String) object.data = ''
              else {
                object.data = []
                if (options.bytes !== Array) object.data = $util.newBuffer(object.data)
              }
              object.compress = false
              object.version = 0
            }
            if (message.event != null && message.hasOwnProperty('event')) object.event = options.enums === String ? ($root.com.quick.voice.proto.EventType[message.event] === undefined ? message.event : $root.com.quick.voice.proto.EventType[message.event]) : message.event
            if (message.data != null && message.hasOwnProperty('data')) object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data
            if (message.compress != null && message.hasOwnProperty('compress')) object.compress = message.compress
            if (message.version != null && message.hasOwnProperty('version')) object.version = message.version
            return object
          }

          /**
           * Converts this SeiData to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.SeiData
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          SeiData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for SeiData
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.SeiData
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          SeiData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.SeiData'
          }

          return SeiData
        })()

        /**
         * EventType enum.
         * @name com.quick.voice.proto.EventType
         * @enum {number}
         * @property {number} Layout=0 Layout value
         * @property {number} Custom=1 Custom value
         */
        proto.EventType = (function () {
          const valuesById = {},
            values = Object.create(valuesById)
          values[(valuesById[0] = 'Layout')] = 0
          values[(valuesById[1] = 'Custom')] = 1
          return values
        })()

        proto.LayoutData = (function () {
          /**
           * Properties of a LayoutData.
           * @memberof com.quick.voice.proto
           * @interface ILayoutData
           * @property {string|null} [roomId] LayoutData roomId
           * @property {com.quick.voice.proto.LayoutType|null} [type] LayoutData type
           * @property {Object.<string,com.quick.voice.proto.IUserInfo>|null} [userMap] LayoutData userMap
           * @property {com.quick.voice.proto.ICustomInfo|null} [globalCustom] LayoutData globalCustom
           */

          /**
           * Constructs a new LayoutData.
           * @memberof com.quick.voice.proto
           * @classdesc Represents a LayoutData.
           * @implements ILayoutData
           * @constructor
           * @param {com.quick.voice.proto.ILayoutData=} [properties] Properties to set
           */
          function LayoutData(properties) {
            this.userMap = {}
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * LayoutData roomId.
           * @member {string} roomId
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           */
          LayoutData.prototype.roomId = ''

          /**
           * LayoutData type.
           * @member {com.quick.voice.proto.LayoutType} type
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           */
          LayoutData.prototype.type = 0

          /**
           * LayoutData userMap.
           * @member {Object.<string,com.quick.voice.proto.IUserInfo>} userMap
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           */
          LayoutData.prototype.userMap = $util.emptyObject

          /**
           * LayoutData globalCustom.
           * @member {com.quick.voice.proto.ICustomInfo|null|undefined} globalCustom
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           */
          LayoutData.prototype.globalCustom = null

          // OneOf field names bound to virtual getters and setters
          let $oneOfFields

          /**
           * LayoutData _globalCustom.
           * @member {"globalCustom"|undefined} _globalCustom
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           */
          Object.defineProperty(LayoutData.prototype, '_globalCustom', {
            get: $util.oneOfGetter(($oneOfFields = ['globalCustom'])),
            set: $util.oneOfSetter($oneOfFields)
          })

          /**
           * Creates a new LayoutData instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {com.quick.voice.proto.ILayoutData=} [properties] Properties to set
           * @returns {com.quick.voice.proto.LayoutData} LayoutData instance
           */
          LayoutData.create = function create(properties) {
            return new LayoutData(properties)
          }

          /**
           * Encodes the specified LayoutData message. Does not implicitly {@link com.quick.voice.proto.LayoutData.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {com.quick.voice.proto.ILayoutData} message LayoutData message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          LayoutData.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.roomId != null && Object.hasOwnProperty.call(message, 'roomId')) writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.roomId)
            if (message.type != null && Object.hasOwnProperty.call(message, 'type')) writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.type)
            if (message.userMap != null && Object.hasOwnProperty.call(message, 'userMap'))
              for (let keys = Object.keys(message.userMap), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 3, wireType 2 =*/ 26).fork().uint32(/* id 1, wireType 2 =*/ 10).string(keys[i])
                $root.com.quick.voice.proto.UserInfo.encode(message.userMap[keys[i]], writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim().ldelim()
              }
            if (message.globalCustom != null && Object.hasOwnProperty.call(message, 'globalCustom')) $root.com.quick.voice.proto.CustomInfo.encode(message.globalCustom, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
            return writer
          }

          /**
           * Encodes the specified LayoutData message, length delimited. Does not implicitly {@link com.quick.voice.proto.LayoutData.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {com.quick.voice.proto.ILayoutData} message LayoutData message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          LayoutData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes a LayoutData message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.LayoutData} LayoutData
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          LayoutData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.LayoutData(),
              key,
              value
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.roomId = reader.string()
                  break
                }
                case 2: {
                  message.type = reader.int32()
                  break
                }
                case 3: {
                  if (message.userMap === $util.emptyObject) message.userMap = {}
                  let end2 = reader.uint32() + reader.pos
                  key = ''
                  value = null
                  while (reader.pos < end2) {
                    let tag2 = reader.uint32()
                    switch (tag2 >>> 3) {
                      case 1:
                        key = reader.string()
                        break
                      case 2:
                        value = $root.com.quick.voice.proto.UserInfo.decode(reader, reader.uint32())
                        break
                      default:
                        reader.skipType(tag2 & 7)
                        break
                    }
                  }
                  message.userMap[key] = value
                  break
                }
                case 4: {
                  message.globalCustom = $root.com.quick.voice.proto.CustomInfo.decode(reader, reader.uint32())
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes a LayoutData message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.LayoutData} LayoutData
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          LayoutData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies a LayoutData message.
           * @function verify
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          LayoutData.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            let properties = {}
            if (message.roomId != null && message.hasOwnProperty('roomId')) if (!$util.isString(message.roomId)) return 'roomId: string expected'
            if (message.type != null && message.hasOwnProperty('type'))
              switch (message.type) {
                default:
                  return 'type: enum value expected'
                case 0:
                case 1:
                case 2:
                  break
              }
            if (message.userMap != null && message.hasOwnProperty('userMap')) {
              if (!$util.isObject(message.userMap)) return 'userMap: object expected'
              let key = Object.keys(message.userMap)
              for (let i = 0; i < key.length; ++i) {
                let error = $root.com.quick.voice.proto.UserInfo.verify(message.userMap[key[i]])
                if (error) return 'userMap.' + error
              }
            }
            if (message.globalCustom != null && message.hasOwnProperty('globalCustom')) {
              properties._globalCustom = 1
              {
                let error = $root.com.quick.voice.proto.CustomInfo.verify(message.globalCustom)
                if (error) return 'globalCustom.' + error
              }
            }
            return null
          }

          /**
           * Creates a LayoutData message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.LayoutData} LayoutData
           */
          LayoutData.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.LayoutData) return object
            let message = new $root.com.quick.voice.proto.LayoutData()
            if (object.roomId != null) message.roomId = String(object.roomId)
            switch (object.type) {
              default:
                if (typeof object.type === 'number') {
                  message.type = object.type
                  break
                }
                break
              case 'AudioAndVideo':
              case 0:
                message.type = 0
                break
              case 'OnlyAudio':
              case 1:
                message.type = 1
                break
              case 'OnlyVideo':
              case 2:
                message.type = 2
                break
            }
            if (object.userMap) {
              if (typeof object.userMap !== 'object') throw TypeError('.com.quick.voice.proto.LayoutData.userMap: object expected')
              message.userMap = {}
              for (let keys = Object.keys(object.userMap), i = 0; i < keys.length; ++i) {
                if (typeof object.userMap[keys[i]] !== 'object') throw TypeError('.com.quick.voice.proto.LayoutData.userMap: object expected')
                message.userMap[keys[i]] = $root.com.quick.voice.proto.UserInfo.fromObject(object.userMap[keys[i]])
              }
            }
            if (object.globalCustom != null) {
              if (typeof object.globalCustom !== 'object') throw TypeError('.com.quick.voice.proto.LayoutData.globalCustom: object expected')
              message.globalCustom = $root.com.quick.voice.proto.CustomInfo.fromObject(object.globalCustom)
            }
            return message
          }

          /**
           * Creates a plain object from a LayoutData message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {com.quick.voice.proto.LayoutData} message LayoutData
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          LayoutData.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.objects || options.defaults) object.userMap = {}
            if (options.defaults) {
              object.roomId = ''
              object.type = options.enums === String ? 'AudioAndVideo' : 0
            }
            if (message.roomId != null && message.hasOwnProperty('roomId')) object.roomId = message.roomId
            if (message.type != null && message.hasOwnProperty('type')) object.type = options.enums === String ? ($root.com.quick.voice.proto.LayoutType[message.type] === undefined ? message.type : $root.com.quick.voice.proto.LayoutType[message.type]) : message.type
            let keys2
            if (message.userMap && (keys2 = Object.keys(message.userMap)).length) {
              object.userMap = {}
              for (let j = 0; j < keys2.length; ++j) object.userMap[keys2[j]] = $root.com.quick.voice.proto.UserInfo.toObject(message.userMap[keys2[j]], options)
            }
            if (message.globalCustom != null && message.hasOwnProperty('globalCustom')) {
              object.globalCustom = $root.com.quick.voice.proto.CustomInfo.toObject(message.globalCustom, options)
              if (options.oneofs) object._globalCustom = 'globalCustom'
            }
            return object
          }

          /**
           * Converts this LayoutData to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.LayoutData
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          LayoutData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for LayoutData
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.LayoutData
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          LayoutData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.LayoutData'
          }

          return LayoutData
        })()

        proto.UserInfo = (function () {
          /**
           * Properties of a UserInfo.
           * @memberof com.quick.voice.proto
           * @interface IUserInfo
           * @property {string|null} [id] UserInfo id
           * @property {Array.<com.quick.voice.proto.IAudioInfo>|null} [audios] UserInfo audios
           * @property {Array.<com.quick.voice.proto.IVideoInfo>|null} [videos] UserInfo videos
           * @property {com.quick.voice.proto.ICustomInfo|null} [custom] UserInfo custom
           */

          /**
           * Constructs a new UserInfo.
           * @memberof com.quick.voice.proto
           * @classdesc Represents a UserInfo.
           * @implements IUserInfo
           * @constructor
           * @param {com.quick.voice.proto.IUserInfo=} [properties] Properties to set
           */
          function UserInfo(properties) {
            this.audios = []
            this.videos = []
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * UserInfo id.
           * @member {string} id
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           */
          UserInfo.prototype.id = ''

          /**
           * UserInfo audios.
           * @member {Array.<com.quick.voice.proto.IAudioInfo>} audios
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           */
          UserInfo.prototype.audios = $util.emptyArray

          /**
           * UserInfo videos.
           * @member {Array.<com.quick.voice.proto.IVideoInfo>} videos
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           */
          UserInfo.prototype.videos = $util.emptyArray

          /**
           * UserInfo custom.
           * @member {com.quick.voice.proto.ICustomInfo|null|undefined} custom
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           */
          UserInfo.prototype.custom = null

          // OneOf field names bound to virtual getters and setters
          let $oneOfFields

          /**
           * UserInfo _custom.
           * @member {"custom"|undefined} _custom
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           */
          Object.defineProperty(UserInfo.prototype, '_custom', {
            get: $util.oneOfGetter(($oneOfFields = ['custom'])),
            set: $util.oneOfSetter($oneOfFields)
          })

          /**
           * Creates a new UserInfo instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {com.quick.voice.proto.IUserInfo=} [properties] Properties to set
           * @returns {com.quick.voice.proto.UserInfo} UserInfo instance
           */
          UserInfo.create = function create(properties) {
            return new UserInfo(properties)
          }

          /**
           * Encodes the specified UserInfo message. Does not implicitly {@link com.quick.voice.proto.UserInfo.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {com.quick.voice.proto.IUserInfo} message UserInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          UserInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id)
            if (message.audios != null && message.audios.length) for (let i = 0; i < message.audios.length; ++i) $root.com.quick.voice.proto.AudioInfo.encode(message.audios[i], writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
            if (message.videos != null && message.videos.length) for (let i = 0; i < message.videos.length; ++i) $root.com.quick.voice.proto.VideoInfo.encode(message.videos[i], writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
            if (message.custom != null && Object.hasOwnProperty.call(message, 'custom')) $root.com.quick.voice.proto.CustomInfo.encode(message.custom, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
            return writer
          }

          /**
           * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.UserInfo.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {com.quick.voice.proto.IUserInfo} message UserInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes a UserInfo message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.UserInfo} UserInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          UserInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.UserInfo()
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.id = reader.string()
                  break
                }
                case 2: {
                  if (!(message.audios && message.audios.length)) message.audios = []
                  message.audios.push($root.com.quick.voice.proto.AudioInfo.decode(reader, reader.uint32()))
                  break
                }
                case 3: {
                  if (!(message.videos && message.videos.length)) message.videos = []
                  message.videos.push($root.com.quick.voice.proto.VideoInfo.decode(reader, reader.uint32()))
                  break
                }
                case 4: {
                  message.custom = $root.com.quick.voice.proto.CustomInfo.decode(reader, reader.uint32())
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes a UserInfo message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.UserInfo} UserInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies a UserInfo message.
           * @function verify
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          UserInfo.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            let properties = {}
            if (message.id != null && message.hasOwnProperty('id')) if (!$util.isString(message.id)) return 'id: string expected'
            if (message.audios != null && message.hasOwnProperty('audios')) {
              if (!Array.isArray(message.audios)) return 'audios: array expected'
              for (let i = 0; i < message.audios.length; ++i) {
                let error = $root.com.quick.voice.proto.AudioInfo.verify(message.audios[i])
                if (error) return 'audios.' + error
              }
            }
            if (message.videos != null && message.hasOwnProperty('videos')) {
              if (!Array.isArray(message.videos)) return 'videos: array expected'
              for (let i = 0; i < message.videos.length; ++i) {
                let error = $root.com.quick.voice.proto.VideoInfo.verify(message.videos[i])
                if (error) return 'videos.' + error
              }
            }
            if (message.custom != null && message.hasOwnProperty('custom')) {
              properties._custom = 1
              {
                let error = $root.com.quick.voice.proto.CustomInfo.verify(message.custom)
                if (error) return 'custom.' + error
              }
            }
            return null
          }

          /**
           * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.UserInfo} UserInfo
           */
          UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.UserInfo) return object
            let message = new $root.com.quick.voice.proto.UserInfo()
            if (object.id != null) message.id = String(object.id)
            if (object.audios) {
              if (!Array.isArray(object.audios)) throw TypeError('.com.quick.voice.proto.UserInfo.audios: array expected')
              message.audios = []
              for (let i = 0; i < object.audios.length; ++i) {
                if (typeof object.audios[i] !== 'object') throw TypeError('.com.quick.voice.proto.UserInfo.audios: object expected')
                message.audios[i] = $root.com.quick.voice.proto.AudioInfo.fromObject(object.audios[i])
              }
            }
            if (object.videos) {
              if (!Array.isArray(object.videos)) throw TypeError('.com.quick.voice.proto.UserInfo.videos: array expected')
              message.videos = []
              for (let i = 0; i < object.videos.length; ++i) {
                if (typeof object.videos[i] !== 'object') throw TypeError('.com.quick.voice.proto.UserInfo.videos: object expected')
                message.videos[i] = $root.com.quick.voice.proto.VideoInfo.fromObject(object.videos[i])
              }
            }
            if (object.custom != null) {
              if (typeof object.custom !== 'object') throw TypeError('.com.quick.voice.proto.UserInfo.custom: object expected')
              message.custom = $root.com.quick.voice.proto.CustomInfo.fromObject(object.custom)
            }
            return message
          }

          /**
           * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {com.quick.voice.proto.UserInfo} message UserInfo
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          UserInfo.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.arrays || options.defaults) {
              object.audios = []
              object.videos = []
            }
            if (options.defaults) object.id = ''
            if (message.id != null && message.hasOwnProperty('id')) object.id = message.id
            if (message.audios && message.audios.length) {
              object.audios = []
              for (let j = 0; j < message.audios.length; ++j) object.audios[j] = $root.com.quick.voice.proto.AudioInfo.toObject(message.audios[j], options)
            }
            if (message.videos && message.videos.length) {
              object.videos = []
              for (let j = 0; j < message.videos.length; ++j) object.videos[j] = $root.com.quick.voice.proto.VideoInfo.toObject(message.videos[j], options)
            }
            if (message.custom != null && message.hasOwnProperty('custom')) {
              object.custom = $root.com.quick.voice.proto.CustomInfo.toObject(message.custom, options)
              if (options.oneofs) object._custom = 'custom'
            }
            return object
          }

          /**
           * Converts this UserInfo to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.UserInfo
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for UserInfo
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.UserInfo
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          UserInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.UserInfo'
          }

          return UserInfo
        })()

        proto.AudioInfo = (function () {
          /**
           * Properties of an AudioInfo.
           * @memberof com.quick.voice.proto
           * @interface IAudioInfo
           * @property {com.quick.voice.proto.AudioType|null} [type] AudioInfo type
           * @property {boolean|null} [isEnable] AudioInfo isEnable
           * @property {boolean|null} [isMute] AudioInfo isMute
           * @property {number|null} [volume] AudioInfo volume
           * @property {number|Long|null} [updateTime] AudioInfo updateTime
           */

          /**
           * Constructs a new AudioInfo.
           * @memberof com.quick.voice.proto
           * @classdesc Represents an AudioInfo.
           * @implements IAudioInfo
           * @constructor
           * @param {com.quick.voice.proto.IAudioInfo=} [properties] Properties to set
           */
          function AudioInfo(properties) {
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * AudioInfo type.
           * @member {com.quick.voice.proto.AudioType} type
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          AudioInfo.prototype.type = 0

          /**
           * AudioInfo isEnable.
           * @member {boolean} isEnable
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          AudioInfo.prototype.isEnable = false

          /**
           * AudioInfo isMute.
           * @member {boolean} isMute
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          AudioInfo.prototype.isMute = false

          /**
           * AudioInfo volume.
           * @member {number} volume
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          AudioInfo.prototype.volume = 0

          /**
           * AudioInfo updateTime.
           * @member {number|Long|null|undefined} updateTime
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          AudioInfo.prototype.updateTime = null

          // OneOf field names bound to virtual getters and setters
          let $oneOfFields

          /**
           * AudioInfo _updateTime.
           * @member {"updateTime"|undefined} _updateTime
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           */
          Object.defineProperty(AudioInfo.prototype, '_updateTime', {
            get: $util.oneOfGetter(($oneOfFields = ['updateTime'])),
            set: $util.oneOfSetter($oneOfFields)
          })

          /**
           * Creates a new AudioInfo instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {com.quick.voice.proto.IAudioInfo=} [properties] Properties to set
           * @returns {com.quick.voice.proto.AudioInfo} AudioInfo instance
           */
          AudioInfo.create = function create(properties) {
            return new AudioInfo(properties)
          }

          /**
           * Encodes the specified AudioInfo message. Does not implicitly {@link com.quick.voice.proto.AudioInfo.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {com.quick.voice.proto.IAudioInfo} message AudioInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          AudioInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.type != null && Object.hasOwnProperty.call(message, 'type')) writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.type)
            if (message.isEnable != null && Object.hasOwnProperty.call(message, 'isEnable')) writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isEnable)
            if (message.isMute != null && Object.hasOwnProperty.call(message, 'isMute')) writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.isMute)
            if (message.volume != null && Object.hasOwnProperty.call(message, 'volume')) writer.uint32(/* id 4, wireType 1 =*/ 33).double(message.volume)
            if (message.updateTime != null && Object.hasOwnProperty.call(message, 'updateTime')) writer.uint32(/* id 5, wireType 0 =*/ 40).int64(message.updateTime)
            return writer
          }

          /**
           * Encodes the specified AudioInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.AudioInfo.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {com.quick.voice.proto.IAudioInfo} message AudioInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          AudioInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes an AudioInfo message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.AudioInfo} AudioInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          AudioInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.AudioInfo()
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.type = reader.int32()
                  break
                }
                case 2: {
                  message.isEnable = reader.bool()
                  break
                }
                case 3: {
                  message.isMute = reader.bool()
                  break
                }
                case 4: {
                  message.volume = reader.double()
                  break
                }
                case 5: {
                  message.updateTime = reader.int64()
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes an AudioInfo message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.AudioInfo} AudioInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          AudioInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies an AudioInfo message.
           * @function verify
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          AudioInfo.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            let properties = {}
            if (message.type != null && message.hasOwnProperty('type'))
              switch (message.type) {
                default:
                  return 'type: enum value expected'
                case 0:
                case 1:
                  break
              }
            if (message.isEnable != null && message.hasOwnProperty('isEnable')) if (typeof message.isEnable !== 'boolean') return 'isEnable: boolean expected'
            if (message.isMute != null && message.hasOwnProperty('isMute')) if (typeof message.isMute !== 'boolean') return 'isMute: boolean expected'
            if (message.volume != null && message.hasOwnProperty('volume')) if (typeof message.volume !== 'number') return 'volume: number expected'
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              properties._updateTime = 1
              if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high))) return 'updateTime: integer|Long expected'
            }
            return null
          }

          /**
           * Creates an AudioInfo message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.AudioInfo} AudioInfo
           */
          AudioInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.AudioInfo) return object
            let message = new $root.com.quick.voice.proto.AudioInfo()
            switch (object.type) {
              default:
                if (typeof object.type === 'number') {
                  message.type = object.type
                  break
                }
                break
              case 'Microphone':
              case 0:
                message.type = 0
                break
              case 'SystemVoice':
              case 1:
                message.type = 1
                break
            }
            if (object.isEnable != null) message.isEnable = Boolean(object.isEnable)
            if (object.isMute != null) message.isMute = Boolean(object.isMute)
            if (object.volume != null) message.volume = Number(object.volume)
            if (object.updateTime != null)
              if ($util.Long) (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false
              else if (typeof object.updateTime === 'string') message.updateTime = parseInt(object.updateTime, 10)
              else if (typeof object.updateTime === 'number') message.updateTime = object.updateTime
              else if (typeof object.updateTime === 'object') message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber()
            return message
          }

          /**
           * Creates a plain object from an AudioInfo message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {com.quick.voice.proto.AudioInfo} message AudioInfo
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          AudioInfo.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.defaults) {
              object.type = options.enums === String ? 'Microphone' : 0
              object.isEnable = false
              object.isMute = false
              object.volume = 0
            }
            if (message.type != null && message.hasOwnProperty('type')) object.type = options.enums === String ? ($root.com.quick.voice.proto.AudioType[message.type] === undefined ? message.type : $root.com.quick.voice.proto.AudioType[message.type]) : message.type
            if (message.isEnable != null && message.hasOwnProperty('isEnable')) object.isEnable = message.isEnable
            if (message.isMute != null && message.hasOwnProperty('isMute')) object.isMute = message.isMute
            if (message.volume != null && message.hasOwnProperty('volume')) object.volume = options.json && !isFinite(message.volume) ? String(message.volume) : message.volume
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              if (typeof message.updateTime === 'number') object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime
              else object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime
              if (options.oneofs) object._updateTime = 'updateTime'
            }
            return object
          }

          /**
           * Converts this AudioInfo to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.AudioInfo
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          AudioInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for AudioInfo
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.AudioInfo
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          AudioInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.AudioInfo'
          }

          return AudioInfo
        })()

        proto.VideoInfo = (function () {
          /**
           * Properties of a VideoInfo.
           * @memberof com.quick.voice.proto
           * @interface IVideoInfo
           * @property {com.quick.voice.proto.VideoType|null} [type] VideoInfo type
           * @property {boolean|null} [isEnable] VideoInfo isEnable
           * @property {boolean|null} [isMute] VideoInfo isMute
           * @property {number|null} [width] VideoInfo width
           * @property {number|null} [height] VideoInfo height
           * @property {number|null} [x] VideoInfo x
           * @property {number|null} [y] VideoInfo y
           * @property {number|Long|null} [updateTime] VideoInfo updateTime
           */

          /**
           * Constructs a new VideoInfo.
           * @memberof com.quick.voice.proto
           * @classdesc Represents a VideoInfo.
           * @implements IVideoInfo
           * @constructor
           * @param {com.quick.voice.proto.IVideoInfo=} [properties] Properties to set
           */
          function VideoInfo(properties) {
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * VideoInfo type.
           * @member {com.quick.voice.proto.VideoType} type
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.type = 0

          /**
           * VideoInfo isEnable.
           * @member {boolean} isEnable
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.isEnable = false

          /**
           * VideoInfo isMute.
           * @member {boolean} isMute
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.isMute = false

          /**
           * VideoInfo width.
           * @member {number} width
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.width = 0

          /**
           * VideoInfo height.
           * @member {number} height
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.height = 0

          /**
           * VideoInfo x.
           * @member {number} x
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.x = 0

          /**
           * VideoInfo y.
           * @member {number} y
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.y = 0

          /**
           * VideoInfo updateTime.
           * @member {number|Long|null|undefined} updateTime
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          VideoInfo.prototype.updateTime = null

          // OneOf field names bound to virtual getters and setters
          let $oneOfFields

          /**
           * VideoInfo _updateTime.
           * @member {"updateTime"|undefined} _updateTime
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           */
          Object.defineProperty(VideoInfo.prototype, '_updateTime', {
            get: $util.oneOfGetter(($oneOfFields = ['updateTime'])),
            set: $util.oneOfSetter($oneOfFields)
          })

          /**
           * Creates a new VideoInfo instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {com.quick.voice.proto.IVideoInfo=} [properties] Properties to set
           * @returns {com.quick.voice.proto.VideoInfo} VideoInfo instance
           */
          VideoInfo.create = function create(properties) {
            return new VideoInfo(properties)
          }

          /**
           * Encodes the specified VideoInfo message. Does not implicitly {@link com.quick.voice.proto.VideoInfo.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {com.quick.voice.proto.IVideoInfo} message VideoInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          VideoInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.type != null && Object.hasOwnProperty.call(message, 'type')) writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.type)
            if (message.isEnable != null && Object.hasOwnProperty.call(message, 'isEnable')) writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isEnable)
            if (message.isMute != null && Object.hasOwnProperty.call(message, 'isMute')) writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.isMute)
            if (message.width != null && Object.hasOwnProperty.call(message, 'width')) writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.width)
            if (message.height != null && Object.hasOwnProperty.call(message, 'height')) writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.height)
            if (message.x != null && Object.hasOwnProperty.call(message, 'x')) writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.x)
            if (message.y != null && Object.hasOwnProperty.call(message, 'y')) writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.y)
            if (message.updateTime != null && Object.hasOwnProperty.call(message, 'updateTime')) writer.uint32(/* id 8, wireType 0 =*/ 64).int64(message.updateTime)
            return writer
          }

          /**
           * Encodes the specified VideoInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.VideoInfo.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {com.quick.voice.proto.IVideoInfo} message VideoInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          VideoInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes a VideoInfo message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.VideoInfo} VideoInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          VideoInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.VideoInfo()
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.type = reader.int32()
                  break
                }
                case 2: {
                  message.isEnable = reader.bool()
                  break
                }
                case 3: {
                  message.isMute = reader.bool()
                  break
                }
                case 4: {
                  message.width = reader.int32()
                  break
                }
                case 5: {
                  message.height = reader.int32()
                  break
                }
                case 6: {
                  message.x = reader.int32()
                  break
                }
                case 7: {
                  message.y = reader.int32()
                  break
                }
                case 8: {
                  message.updateTime = reader.int64()
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes a VideoInfo message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.VideoInfo} VideoInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          VideoInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies a VideoInfo message.
           * @function verify
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          VideoInfo.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            let properties = {}
            if (message.type != null && message.hasOwnProperty('type'))
              switch (message.type) {
                default:
                  return 'type: enum value expected'
                case 0:
                case 1:
                  break
              }
            if (message.isEnable != null && message.hasOwnProperty('isEnable')) if (typeof message.isEnable !== 'boolean') return 'isEnable: boolean expected'
            if (message.isMute != null && message.hasOwnProperty('isMute')) if (typeof message.isMute !== 'boolean') return 'isMute: boolean expected'
            if (message.width != null && message.hasOwnProperty('width')) if (!$util.isInteger(message.width)) return 'width: integer expected'
            if (message.height != null && message.hasOwnProperty('height')) if (!$util.isInteger(message.height)) return 'height: integer expected'
            if (message.x != null && message.hasOwnProperty('x')) if (!$util.isInteger(message.x)) return 'x: integer expected'
            if (message.y != null && message.hasOwnProperty('y')) if (!$util.isInteger(message.y)) return 'y: integer expected'
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              properties._updateTime = 1
              if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high))) return 'updateTime: integer|Long expected'
            }
            return null
          }

          /**
           * Creates a VideoInfo message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.VideoInfo} VideoInfo
           */
          VideoInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.VideoInfo) return object
            let message = new $root.com.quick.voice.proto.VideoInfo()
            switch (object.type) {
              default:
                if (typeof object.type === 'number') {
                  message.type = object.type
                  break
                }
                break
              case 'Camera':
              case 0:
                message.type = 0
                break
              case 'Screen':
              case 1:
                message.type = 1
                break
            }
            if (object.isEnable != null) message.isEnable = Boolean(object.isEnable)
            if (object.isMute != null) message.isMute = Boolean(object.isMute)
            if (object.width != null) message.width = object.width | 0
            if (object.height != null) message.height = object.height | 0
            if (object.x != null) message.x = object.x | 0
            if (object.y != null) message.y = object.y | 0
            if (object.updateTime != null)
              if ($util.Long) (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false
              else if (typeof object.updateTime === 'string') message.updateTime = parseInt(object.updateTime, 10)
              else if (typeof object.updateTime === 'number') message.updateTime = object.updateTime
              else if (typeof object.updateTime === 'object') message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber()
            return message
          }

          /**
           * Creates a plain object from a VideoInfo message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {com.quick.voice.proto.VideoInfo} message VideoInfo
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          VideoInfo.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.defaults) {
              object.type = options.enums === String ? 'Camera' : 0
              object.isEnable = false
              object.isMute = false
              object.width = 0
              object.height = 0
              object.x = 0
              object.y = 0
            }
            if (message.type != null && message.hasOwnProperty('type')) object.type = options.enums === String ? ($root.com.quick.voice.proto.VideoType[message.type] === undefined ? message.type : $root.com.quick.voice.proto.VideoType[message.type]) : message.type
            if (message.isEnable != null && message.hasOwnProperty('isEnable')) object.isEnable = message.isEnable
            if (message.isMute != null && message.hasOwnProperty('isMute')) object.isMute = message.isMute
            if (message.width != null && message.hasOwnProperty('width')) object.width = message.width
            if (message.height != null && message.hasOwnProperty('height')) object.height = message.height
            if (message.x != null && message.hasOwnProperty('x')) object.x = message.x
            if (message.y != null && message.hasOwnProperty('y')) object.y = message.y
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              if (typeof message.updateTime === 'number') object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime
              else object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime
              if (options.oneofs) object._updateTime = 'updateTime'
            }
            return object
          }

          /**
           * Converts this VideoInfo to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.VideoInfo
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          VideoInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for VideoInfo
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.VideoInfo
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          VideoInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.VideoInfo'
          }

          return VideoInfo
        })()

        proto.CustomInfo = (function () {
          /**
           * Properties of a CustomInfo.
           * @memberof com.quick.voice.proto
           * @interface ICustomInfo
           * @property {string|null} [roomId] CustomInfo roomId
           * @property {Object.<string,string>|null} [customKeyMap] CustomInfo customKeyMap
           * @property {number|Long|null} [updateTime] CustomInfo updateTime
           */

          /**
           * Constructs a new CustomInfo.
           * @memberof com.quick.voice.proto
           * @classdesc Represents a CustomInfo.
           * @implements ICustomInfo
           * @constructor
           * @param {com.quick.voice.proto.ICustomInfo=} [properties] Properties to set
           */
          function CustomInfo(properties) {
            this.customKeyMap = {}
            if (properties) for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
          }

          /**
           * CustomInfo roomId.
           * @member {string} roomId
           * @memberof com.quick.voice.proto.CustomInfo
           * @instance
           */
          CustomInfo.prototype.roomId = ''

          /**
           * CustomInfo customKeyMap.
           * @member {Object.<string,string>} customKeyMap
           * @memberof com.quick.voice.proto.CustomInfo
           * @instance
           */
          CustomInfo.prototype.customKeyMap = $util.emptyObject

          /**
           * CustomInfo updateTime.
           * @member {number|Long|null|undefined} updateTime
           * @memberof com.quick.voice.proto.CustomInfo
           * @instance
           */
          CustomInfo.prototype.updateTime = null

          // OneOf field names bound to virtual getters and setters
          let $oneOfFields

          /**
           * CustomInfo _updateTime.
           * @member {"updateTime"|undefined} _updateTime
           * @memberof com.quick.voice.proto.CustomInfo
           * @instance
           */
          Object.defineProperty(CustomInfo.prototype, '_updateTime', {
            get: $util.oneOfGetter(($oneOfFields = ['updateTime'])),
            set: $util.oneOfSetter($oneOfFields)
          })

          /**
           * Creates a new CustomInfo instance using the specified properties.
           * @function create
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {com.quick.voice.proto.ICustomInfo=} [properties] Properties to set
           * @returns {com.quick.voice.proto.CustomInfo} CustomInfo instance
           */
          CustomInfo.create = function create(properties) {
            return new CustomInfo(properties)
          }

          /**
           * Encodes the specified CustomInfo message. Does not implicitly {@link com.quick.voice.proto.CustomInfo.verify|verify} messages.
           * @function encode
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {com.quick.voice.proto.ICustomInfo} message CustomInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          CustomInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create()
            if (message.roomId != null && Object.hasOwnProperty.call(message, 'roomId')) writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.roomId)
            if (message.customKeyMap != null && Object.hasOwnProperty.call(message, 'customKeyMap')) for (let keys = Object.keys(message.customKeyMap), i = 0; i < keys.length; ++i) writer.uint32(/* id 2, wireType 2 =*/ 18).fork().uint32(/* id 1, wireType 2 =*/ 10).string(keys[i]).uint32(/* id 2, wireType 2 =*/ 18).string(message.customKeyMap[keys[i]]).ldelim()
            if (message.updateTime != null && Object.hasOwnProperty.call(message, 'updateTime')) writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.updateTime)
            return writer
          }

          /**
           * Encodes the specified CustomInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.CustomInfo.verify|verify} messages.
           * @function encodeDelimited
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {com.quick.voice.proto.ICustomInfo} message CustomInfo message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          CustomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim()
          }

          /**
           * Decodes a CustomInfo message from the specified reader or buffer.
           * @function decode
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {com.quick.voice.proto.CustomInfo} CustomInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          CustomInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
            let end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.com.quick.voice.proto.CustomInfo(),
              key,
              value
            while (reader.pos < end) {
              let tag = reader.uint32()
              if (tag === error) break
              switch (tag >>> 3) {
                case 1: {
                  message.roomId = reader.string()
                  break
                }
                case 2: {
                  if (message.customKeyMap === $util.emptyObject) message.customKeyMap = {}
                  let end2 = reader.uint32() + reader.pos
                  key = ''
                  value = ''
                  while (reader.pos < end2) {
                    let tag2 = reader.uint32()
                    switch (tag2 >>> 3) {
                      case 1:
                        key = reader.string()
                        break
                      case 2:
                        value = reader.string()
                        break
                      default:
                        reader.skipType(tag2 & 7)
                        break
                    }
                  }
                  message.customKeyMap[key] = value
                  break
                }
                case 3: {
                  message.updateTime = reader.int64()
                  break
                }
                default:
                  reader.skipType(tag & 7)
                  break
              }
            }
            return message
          }

          /**
           * Decodes a CustomInfo message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {com.quick.voice.proto.CustomInfo} CustomInfo
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          CustomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader)
            return this.decode(reader, reader.uint32())
          }

          /**
           * Verifies a CustomInfo message.
           * @function verify
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          CustomInfo.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected'
            let properties = {}
            if (message.roomId != null && message.hasOwnProperty('roomId')) if (!$util.isString(message.roomId)) return 'roomId: string expected'
            if (message.customKeyMap != null && message.hasOwnProperty('customKeyMap')) {
              if (!$util.isObject(message.customKeyMap)) return 'customKeyMap: object expected'
              let key = Object.keys(message.customKeyMap)
              for (let i = 0; i < key.length; ++i) if (!$util.isString(message.customKeyMap[key[i]])) return 'customKeyMap: string{k:string} expected'
            }
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              properties._updateTime = 1
              if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high))) return 'updateTime: integer|Long expected'
            }
            return null
          }

          /**
           * Creates a CustomInfo message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {com.quick.voice.proto.CustomInfo} CustomInfo
           */
          CustomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.com.quick.voice.proto.CustomInfo) return object
            let message = new $root.com.quick.voice.proto.CustomInfo()
            if (object.roomId != null) message.roomId = String(object.roomId)
            if (object.customKeyMap) {
              if (typeof object.customKeyMap !== 'object') throw TypeError('.com.quick.voice.proto.CustomInfo.customKeyMap: object expected')
              message.customKeyMap = {}
              for (let keys = Object.keys(object.customKeyMap), i = 0; i < keys.length; ++i) message.customKeyMap[keys[i]] = String(object.customKeyMap[keys[i]])
            }
            if (object.updateTime != null)
              if ($util.Long) (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false
              else if (typeof object.updateTime === 'string') message.updateTime = parseInt(object.updateTime, 10)
              else if (typeof object.updateTime === 'number') message.updateTime = object.updateTime
              else if (typeof object.updateTime === 'object') message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber()
            return message
          }

          /**
           * Creates a plain object from a CustomInfo message. Also converts values to other types if specified.
           * @function toObject
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {com.quick.voice.proto.CustomInfo} message CustomInfo
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          CustomInfo.toObject = function toObject(message, options) {
            if (!options) options = {}
            let object = {}
            if (options.objects || options.defaults) object.customKeyMap = {}
            if (options.defaults) object.roomId = ''
            if (message.roomId != null && message.hasOwnProperty('roomId')) object.roomId = message.roomId
            let keys2
            if (message.customKeyMap && (keys2 = Object.keys(message.customKeyMap)).length) {
              object.customKeyMap = {}
              for (let j = 0; j < keys2.length; ++j) object.customKeyMap[keys2[j]] = message.customKeyMap[keys2[j]]
            }
            if (message.updateTime != null && message.hasOwnProperty('updateTime')) {
              if (typeof message.updateTime === 'number') object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime
              else object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime
              if (options.oneofs) object._updateTime = 'updateTime'
            }
            return object
          }

          /**
           * Converts this CustomInfo to JSON.
           * @function toJSON
           * @memberof com.quick.voice.proto.CustomInfo
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          CustomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
          }

          /**
           * Gets the default type url for CustomInfo
           * @function getTypeUrl
           * @memberof com.quick.voice.proto.CustomInfo
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          CustomInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = 'type.googleapis.com'
            }
            return typeUrlPrefix + '/com.quick.voice.proto.CustomInfo'
          }

          return CustomInfo
        })()

        /**
         * LayoutType enum.
         * @name com.quick.voice.proto.LayoutType
         * @enum {number}
         * @property {number} AudioAndVideo=0 AudioAndVideo value
         * @property {number} OnlyAudio=1 OnlyAudio value
         * @property {number} OnlyVideo=2 OnlyVideo value
         */
        proto.LayoutType = (function () {
          const valuesById = {},
            values = Object.create(valuesById)
          values[(valuesById[0] = 'AudioAndVideo')] = 0
          values[(valuesById[1] = 'OnlyAudio')] = 1
          values[(valuesById[2] = 'OnlyVideo')] = 2
          return values
        })()

        /**
         * AudioType enum.
         * @name com.quick.voice.proto.AudioType
         * @enum {number}
         * @property {number} Microphone=0 Microphone value
         * @property {number} SystemVoice=1 SystemVoice value
         */
        proto.AudioType = (function () {
          const valuesById = {},
            values = Object.create(valuesById)
          values[(valuesById[0] = 'Microphone')] = 0
          values[(valuesById[1] = 'SystemVoice')] = 1
          return values
        })()

        /**
         * VideoType enum.
         * @name com.quick.voice.proto.VideoType
         * @enum {number}
         * @property {number} Camera=0 Camera value
         * @property {number} Screen=1 Screen value
         */
        proto.VideoType = (function () {
          const valuesById = {},
            values = Object.create(valuesById)
          values[(valuesById[0] = 'Camera')] = 0
          values[(valuesById[1] = 'Screen')] = 1
          return values
        })()

        return proto
      })()

      return voice
    })()

    return quick
  })()

  return com
})())

export { $root as default }
