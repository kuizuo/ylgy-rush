import { setup } from '@css-render/vue3-ssr'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
  })

  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp)
    const originalRender = nuxtApp.ssrContext.renderMeta
    nuxtApp.ssrContext!.renderMeta = () => {
      const result = originalRender()
      return {
        headTags: result.headTags + collect(), // 组合样式跟head信息
      }
    }
  }
})
