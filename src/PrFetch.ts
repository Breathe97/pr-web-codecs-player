interface PrFetchOption {
  timeout?: number
}

export class PrFetch {
  #url = ''
  #option: PrFetchOption = {
    timeout: 5 * 1000
  }
  #abortController?: AbortController

  constructor(option: PrFetchOption = {}) {
    this.#option = { ...this.#option, ...option }
  }

  #check = () => {
    return new Promise<{ status: 'successed' | 'failed' | 'error' | 'timeout'; reason: string }>(async (resolve, reject) => {
      this.stop() // 终止可能存在的上次请求
      this.#abortController = new AbortController()
      // 超时 终止该请求
      const timer = window.setTimeout(() => {
        this.#abortController?.abort('Timeout.')
        reject({ status: 'timeout', reason: '' })
      }, this.#option.timeout)

      try {
        // 尝试请求
        const res = await fetch(this.#url, { method: 'HEAD', signal: this.#abortController?.signal })

        if (res.status === 200) {
          resolve({ status: 'successed', reason: '' })
        } else {
          reject({ status: 'failed', reason: `${res.status}` })
        }
      } catch (error: any) {
        reject({ status: 'error', reason: error.message })
      }
      clearTimeout(timer)
    })
  }

  /**
   *
   * @param url string
   */
  get = async (url: string) => {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        this.#url = url
        await this.#check()
        this.#abortController = new AbortController()
        const res = await fetch(this.#url, { signal: this.#abortController?.signal })
        resolve(res)
      } catch (error: any) {
        this.stop() // 终止本次请求
        reject(error)
      }
    })
  }

  /**
   * stop
   */
  stop = () => {
    // 如果存在之前的请求 并且未被终止则主动终止该请求
    if (this.#abortController?.signal.aborted === false) {
      this.#abortController.abort('Actively stop.')
    }
  }
}
