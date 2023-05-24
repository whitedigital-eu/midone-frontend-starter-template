import { defineStore } from 'pinia'
import HeartbeatRepository from '../Repositories/HeartbeatRepository'

const hasMainJsChanged = (hashFromHeartbeat: string) => {
  const scripts = document.querySelectorAll('script')
  const indexScript = [...scripts].find((script) =>
    script.src.match(/.*index-([^.]+)\.js/)
  )
  if (!indexScript) return false
  return !new URL(indexScript.src).pathname.includes(hashFromHeartbeat)
}

export const useHeartbeat = defineStore('heartbeat', {
  state: () => ({ showReloadSection: false }),
  actions: {
    getHeartbeatResponse: async function () {
      try {
        const heartbeat = await HeartbeatRepository.get()
        document.title = heartbeat.titleString
        this.showReloadSection = hasMainJsChanged(heartbeat.mainJsHash)
      } catch (e) {
        console.log(e)
      }
    },
  },
})
