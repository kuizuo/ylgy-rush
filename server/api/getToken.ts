import * as qs from 'qs'
import axios from 'axios'

const UserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c26) NetType/WIFI Language/zh_CN'

const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMjcyNDYsIm5iZiI6MTY2MzIyNTA0NiwiaWF0IjoxNjYzMjIzMjQ2LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo4MzU0MzAxNCwiZGVidWciOiIiLCJsYW5nIjoiIn0.5qpiRRjxwUmN1U8Qst8dFBMWMQyWi26DcfTgHIITZds'

export default defineEventHandler(async (event) => {
  const { uid } = useQuery(event)

  const query = qs.stringify({
    'uid': uid,
    't': t,
    'content-type': 'application/json',
    'User-Agent': UserAgent,
  })

  const json_user_info = await (await axios.get(`https://cat-match.easygame2021.com/sheep/v1/game/user_info?${query}`)).data

  console.log('wx_open_id', json_user_info.data.wx_open_id)

  const postData = qs.stringify({
    'uid': json_user_info.data.wx_open_id,
    'avatar': 1,
    'nick_name': 1,
    'sex': 1,
    't': t,
    'content-type': 'application/json',
    'User-Agent': UserAgent,
  })

  const json_oppo = await (await axios.post('https://cat-match.easygame2021.com/sheep/v1/user/login_oppo', postData)).data

  return json_oppo.data.token
})
