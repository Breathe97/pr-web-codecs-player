import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace com. */
export namespace com {

    /** Namespace quick. */
    namespace quick {

        /** Namespace voice. */
        namespace voice {

            /** Namespace proto. */
            namespace proto {

                /** Properties of a SeiData. */
                interface ISeiData {

                    /** SeiData event */
                    event?: (com.quick.voice.proto.EventType|null);

                    /** SeiData data */
                    data?: (Uint8Array|null);

                    /** SeiData compress */
                    compress?: (boolean|null);

                    /** SeiData version */
                    version?: (number|null);
                }

                /** Represents a SeiData. */
                class SeiData implements ISeiData {

                    /**
                     * Constructs a new SeiData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.ISeiData);

                    /** SeiData event. */
                    public event: com.quick.voice.proto.EventType;

                    /** SeiData data. */
                    public data: Uint8Array;

                    /** SeiData compress. */
                    public compress: boolean;

                    /** SeiData version. */
                    public version: number;

                    /**
                     * Creates a new SeiData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SeiData instance
                     */
                    public static create(properties?: com.quick.voice.proto.ISeiData): com.quick.voice.proto.SeiData;

                    /**
                     * Encodes the specified SeiData message. Does not implicitly {@link com.quick.voice.proto.SeiData.verify|verify} messages.
                     * @param message SeiData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.ISeiData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SeiData message, length delimited. Does not implicitly {@link com.quick.voice.proto.SeiData.verify|verify} messages.
                     * @param message SeiData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.ISeiData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SeiData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SeiData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.SeiData;

                    /**
                     * Decodes a SeiData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SeiData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.SeiData;

                    /**
                     * Verifies a SeiData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SeiData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SeiData
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.SeiData;

                    /**
                     * Creates a plain object from a SeiData message. Also converts values to other types if specified.
                     * @param message SeiData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.SeiData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SeiData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SeiData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** EventType enum. */
                enum EventType {
                    Layout = 0,
                    Custom = 1
                }

                /** Properties of a LayoutData. */
                interface ILayoutData {

                    /** LayoutData roomId */
                    roomId?: (string|null);

                    /** LayoutData type */
                    type?: (com.quick.voice.proto.LayoutType|null);

                    /** LayoutData userMap */
                    userMap?: ({ [k: string]: com.quick.voice.proto.IUserInfo }|null);

                    /** LayoutData globalCustom */
                    globalCustom?: (com.quick.voice.proto.ICustomInfo|null);
                }

                /** Represents a LayoutData. */
                class LayoutData implements ILayoutData {

                    /**
                     * Constructs a new LayoutData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.ILayoutData);

                    /** LayoutData roomId. */
                    public roomId: string;

                    /** LayoutData type. */
                    public type: com.quick.voice.proto.LayoutType;

                    /** LayoutData userMap. */
                    public userMap: { [k: string]: com.quick.voice.proto.IUserInfo };

                    /** LayoutData globalCustom. */
                    public globalCustom?: (com.quick.voice.proto.ICustomInfo|null);

                    /** LayoutData _globalCustom. */
                    public _globalCustom?: "globalCustom";

                    /**
                     * Creates a new LayoutData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns LayoutData instance
                     */
                    public static create(properties?: com.quick.voice.proto.ILayoutData): com.quick.voice.proto.LayoutData;

                    /**
                     * Encodes the specified LayoutData message. Does not implicitly {@link com.quick.voice.proto.LayoutData.verify|verify} messages.
                     * @param message LayoutData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.ILayoutData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified LayoutData message, length delimited. Does not implicitly {@link com.quick.voice.proto.LayoutData.verify|verify} messages.
                     * @param message LayoutData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.ILayoutData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a LayoutData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns LayoutData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.LayoutData;

                    /**
                     * Decodes a LayoutData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns LayoutData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.LayoutData;

                    /**
                     * Verifies a LayoutData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a LayoutData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns LayoutData
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.LayoutData;

                    /**
                     * Creates a plain object from a LayoutData message. Also converts values to other types if specified.
                     * @param message LayoutData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.LayoutData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this LayoutData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for LayoutData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a UserInfo. */
                interface IUserInfo {

                    /** UserInfo id */
                    id?: (string|null);

                    /** UserInfo audios */
                    audios?: (com.quick.voice.proto.IAudioInfo[]|null);

                    /** UserInfo videos */
                    videos?: (com.quick.voice.proto.IVideoInfo[]|null);

                    /** UserInfo custom */
                    custom?: (com.quick.voice.proto.ICustomInfo|null);
                }

                /** Represents a UserInfo. */
                class UserInfo implements IUserInfo {

                    /**
                     * Constructs a new UserInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.IUserInfo);

                    /** UserInfo id. */
                    public id: string;

                    /** UserInfo audios. */
                    public audios: com.quick.voice.proto.IAudioInfo[];

                    /** UserInfo videos. */
                    public videos: com.quick.voice.proto.IVideoInfo[];

                    /** UserInfo custom. */
                    public custom?: (com.quick.voice.proto.ICustomInfo|null);

                    /** UserInfo _custom. */
                    public _custom?: "custom";

                    /**
                     * Creates a new UserInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UserInfo instance
                     */
                    public static create(properties?: com.quick.voice.proto.IUserInfo): com.quick.voice.proto.UserInfo;

                    /**
                     * Encodes the specified UserInfo message. Does not implicitly {@link com.quick.voice.proto.UserInfo.verify|verify} messages.
                     * @param message UserInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.UserInfo.verify|verify} messages.
                     * @param message UserInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a UserInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UserInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.UserInfo;

                    /**
                     * Decodes a UserInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UserInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.UserInfo;

                    /**
                     * Verifies a UserInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UserInfo
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.UserInfo;

                    /**
                     * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
                     * @param message UserInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UserInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for UserInfo
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an AudioInfo. */
                interface IAudioInfo {

                    /** AudioInfo type */
                    type?: (com.quick.voice.proto.AudioType|null);

                    /** AudioInfo isEnable */
                    isEnable?: (boolean|null);

                    /** AudioInfo isMute */
                    isMute?: (boolean|null);

                    /** AudioInfo volume */
                    volume?: (number|null);

                    /** AudioInfo updateTime */
                    updateTime?: (number|Long|null);
                }

                /** Represents an AudioInfo. */
                class AudioInfo implements IAudioInfo {

                    /**
                     * Constructs a new AudioInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.IAudioInfo);

                    /** AudioInfo type. */
                    public type: com.quick.voice.proto.AudioType;

                    /** AudioInfo isEnable. */
                    public isEnable: boolean;

                    /** AudioInfo isMute. */
                    public isMute: boolean;

                    /** AudioInfo volume. */
                    public volume: number;

                    /** AudioInfo updateTime. */
                    public updateTime?: (number|Long|null);

                    /** AudioInfo _updateTime. */
                    public _updateTime?: "updateTime";

                    /**
                     * Creates a new AudioInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AudioInfo instance
                     */
                    public static create(properties?: com.quick.voice.proto.IAudioInfo): com.quick.voice.proto.AudioInfo;

                    /**
                     * Encodes the specified AudioInfo message. Does not implicitly {@link com.quick.voice.proto.AudioInfo.verify|verify} messages.
                     * @param message AudioInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.IAudioInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AudioInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.AudioInfo.verify|verify} messages.
                     * @param message AudioInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.IAudioInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AudioInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AudioInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.AudioInfo;

                    /**
                     * Decodes an AudioInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AudioInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.AudioInfo;

                    /**
                     * Verifies an AudioInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AudioInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AudioInfo
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.AudioInfo;

                    /**
                     * Creates a plain object from an AudioInfo message. Also converts values to other types if specified.
                     * @param message AudioInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.AudioInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AudioInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for AudioInfo
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a VideoInfo. */
                interface IVideoInfo {

                    /** VideoInfo type */
                    type?: (com.quick.voice.proto.VideoType|null);

                    /** VideoInfo isEnable */
                    isEnable?: (boolean|null);

                    /** VideoInfo isMute */
                    isMute?: (boolean|null);

                    /** VideoInfo width */
                    width?: (number|null);

                    /** VideoInfo height */
                    height?: (number|null);

                    /** VideoInfo x */
                    x?: (number|null);

                    /** VideoInfo y */
                    y?: (number|null);

                    /** VideoInfo updateTime */
                    updateTime?: (number|Long|null);
                }

                /** Represents a VideoInfo. */
                class VideoInfo implements IVideoInfo {

                    /**
                     * Constructs a new VideoInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.IVideoInfo);

                    /** VideoInfo type. */
                    public type: com.quick.voice.proto.VideoType;

                    /** VideoInfo isEnable. */
                    public isEnable: boolean;

                    /** VideoInfo isMute. */
                    public isMute: boolean;

                    /** VideoInfo width. */
                    public width: number;

                    /** VideoInfo height. */
                    public height: number;

                    /** VideoInfo x. */
                    public x: number;

                    /** VideoInfo y. */
                    public y: number;

                    /** VideoInfo updateTime. */
                    public updateTime?: (number|Long|null);

                    /** VideoInfo _updateTime. */
                    public _updateTime?: "updateTime";

                    /**
                     * Creates a new VideoInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns VideoInfo instance
                     */
                    public static create(properties?: com.quick.voice.proto.IVideoInfo): com.quick.voice.proto.VideoInfo;

                    /**
                     * Encodes the specified VideoInfo message. Does not implicitly {@link com.quick.voice.proto.VideoInfo.verify|verify} messages.
                     * @param message VideoInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.IVideoInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified VideoInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.VideoInfo.verify|verify} messages.
                     * @param message VideoInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.IVideoInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a VideoInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns VideoInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.VideoInfo;

                    /**
                     * Decodes a VideoInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns VideoInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.VideoInfo;

                    /**
                     * Verifies a VideoInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a VideoInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns VideoInfo
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.VideoInfo;

                    /**
                     * Creates a plain object from a VideoInfo message. Also converts values to other types if specified.
                     * @param message VideoInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.VideoInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this VideoInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for VideoInfo
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a CustomInfo. */
                interface ICustomInfo {

                    /** CustomInfo roomId */
                    roomId?: (string|null);

                    /** CustomInfo customKeyMap */
                    customKeyMap?: ({ [k: string]: string }|null);

                    /** CustomInfo updateTime */
                    updateTime?: (number|Long|null);
                }

                /** Represents a CustomInfo. */
                class CustomInfo implements ICustomInfo {

                    /**
                     * Constructs a new CustomInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.quick.voice.proto.ICustomInfo);

                    /** CustomInfo roomId. */
                    public roomId: string;

                    /** CustomInfo customKeyMap. */
                    public customKeyMap: { [k: string]: string };

                    /** CustomInfo updateTime. */
                    public updateTime?: (number|Long|null);

                    /** CustomInfo _updateTime. */
                    public _updateTime?: "updateTime";

                    /**
                     * Creates a new CustomInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CustomInfo instance
                     */
                    public static create(properties?: com.quick.voice.proto.ICustomInfo): com.quick.voice.proto.CustomInfo;

                    /**
                     * Encodes the specified CustomInfo message. Does not implicitly {@link com.quick.voice.proto.CustomInfo.verify|verify} messages.
                     * @param message CustomInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.quick.voice.proto.ICustomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CustomInfo message, length delimited. Does not implicitly {@link com.quick.voice.proto.CustomInfo.verify|verify} messages.
                     * @param message CustomInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.quick.voice.proto.ICustomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CustomInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CustomInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.quick.voice.proto.CustomInfo;

                    /**
                     * Decodes a CustomInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CustomInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.quick.voice.proto.CustomInfo;

                    /**
                     * Verifies a CustomInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CustomInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CustomInfo
                     */
                    public static fromObject(object: { [k: string]: any }): com.quick.voice.proto.CustomInfo;

                    /**
                     * Creates a plain object from a CustomInfo message. Also converts values to other types if specified.
                     * @param message CustomInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.quick.voice.proto.CustomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CustomInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for CustomInfo
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** LayoutType enum. */
                enum LayoutType {
                    AudioAndVideo = 0,
                    OnlyAudio = 1,
                    OnlyVideo = 2
                }

                /** AudioType enum. */
                enum AudioType {
                    Microphone = 0,
                    SystemVoice = 1
                }

                /** VideoType enum. */
                enum VideoType {
                    Camera = 0,
                    Screen = 1
                }
            }
        }
    }
}
