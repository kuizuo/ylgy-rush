<script setup lang="ts">
import { useMessage } from 'naive-ui'
import async from 'async'

const message = useMessage()
const uid = $(useLocalStorage('yang_uid', ''))
let token = $(useLocalStorage('yang_token', ''))
let logs = $ref<string[]>([])

const config = $(useLocalStorage('yang_config', {
  times: 100,
  concurrent: 2,
}))

let starting = $ref(false)

const getToken = async () => {
  const res = await fetch(`/api/getToken?uid=${uid}`)
  const data = await res.text()
  if (data) {
    message.success('获取token成功')
    token = data
  }
  else {
    message.error('获取token失败,请重新尝试或手动填写token')
  }
}

const addTimes = async () => {
  const res = await fetch(`/api/add_times?t=${token}`)
  const data = await res.json()
  return JSON.stringify(data)
}

const start = async () => {
  starting = true
  logs = []
  await new Promise((resolve, reject) => {
    async.mapLimit(new Array(config.times).fill(0), config.concurrent, async () => {
      const res = await addTimes()
      if (starting === false)
        throw new Error('stop')

      logs.push(res)
      return res
    }, (err, results) => {
      starting = false

      if (err)
        reject(err)

      else
        resolve(null)
    })
  })

  starting = false
}

const stop = async () => {
  starting = false
}
</script>

<template>
  <div flex justify-center>
    <n-card max-w-1024px>
      <n-alert title="使用说明" type="info">
        打开羊羊小程序，点击俺的名片，把 ID 记下来，在下面方输入自己的 ID ， 点击获取，将自动填写Token。
        填写要刷的次数，与并发数量（不宜过高），点击开始，即可开始刷次数。
      </n-alert>

      <div mt-4 flex flex-col justify-center items-center gap-4>
        <div flex justify-center items-center w-full lg:w-100>
          <label min-w-20>uid</label>
          <n-input v-model:value="uid" type="text" placeholder="请输入uid" @keydown.enter="getToken" />
          <n-button type="primary" strong secondary @click="getToken">
            获取Token
          </n-button>
        </div>

        <div flex justify-center items-center w-full lg:w-100>
          <label min-w-20>Token</label>
          <n-input v-model:value="token" type="text" placeholder="请输入token" />
        </div>

        <div flex justify-center items-center w-full lg:w-100>
          <label min-w-20>次数</label>
          <n-input-number v-model:value="config.times" w-full :min="1" :max="1000" clearable />
        </div>
        <div flex justify-center items-center w-full lg:w-100>
          <label min-w-20>并发数量</label>
          <n-input-number v-model:value="config.concurrent" w-full :min="1" :max="10" clearable />
        </div>
      </div>

      <n-button type="info" mt-4 w-full lg:w-100 strong secondary :disabled="!token" @click="starting ? stop() : start()">
        {{ starting ? '停止' : '开始' }}
      </n-button>

      <div class="logs">
        <n-log :rows="logs.length" :log="`${logs.join('\n')}`" />
      </div>
    </n-card>
  </div>
</template>

<style scoped>
</style>
