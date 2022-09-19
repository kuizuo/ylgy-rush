import axios from 'axios'
import * as qs from 'qs'

const UserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile / 15E148 MicroMessenger / 8.0.28(0x18001c26) NetType / WIFI Language / zh_CN'

export default defineEventHandler(async (event) => {
  const { t } = useQuery(event)
  const query = qs.stringify({
    'rank_score': '1',
    'rank_state': '1',
    'rank_time': '0',
    'rank_role': '1',
    'skin': '1',
    't': t,
    'content-type': 'application/json',
    'User-Agent': UserAgent,

  })

  const json_game_over = await (await axios.get(`https://cat-match.easygame2021.com/sheep/v1/game/game_over?${query}`)).data

  return json_game_over
})
