import { onMounted, ref } from 'vue'
// import { createIriString, loadResource } from '../../Mixins/DataFetching'
// import { Heartbeat } from '../../Types/Heartbeat'
// import {
//   impersonatedUserEmail,
//   impersonate,
//   stopImpersonation,
// } from '../../Mixins/Impersonation'

// const hasMainJsChanged = (hashFromHeartbeat: string) => {
//   const scripts = document.querySelectorAll('script')
//   const indexScript = [...scripts].find((script) =>
//     script.src.includes('index')
//   )
//   if (!indexScript) return false
//   const mainScriptPathname = new URL(indexScript.src).pathname
//   return !mainScriptPathname.includes(hashFromHeartbeat)
// }

export const useHeartbeat = () => {
  const showReloadPageSection = ref(false)

  // const getHeartbeatResponse = async function () {
  // try {
  //   const tempImpersonatedEmail = impersonatedUserEmail.value
  //   if (tempImpersonatedEmail) stopImpersonation()
  //   const heartbeatData = await loadResource<Heartbeat>(
  //     createIriString('heartbeat')
  //   )
  //   if (tempImpersonatedEmail) impersonate(tempImpersonatedEmail)
  //
  //   if (heartbeatData) {
  //     document.title = heartbeatData.titleString
  //     showReloadPageSection.value = hasMainJsChanged(heartbeatData.mainJsHash)
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
  // }

  onMounted(() => {
    // getHeartbeatResponse()
    // setInterval(() => {
    //   if (!showReloadPageSection.value) getHeartbeatResponse()
    // }, 60000)
  })

  return { showReloadPageSection }
}
