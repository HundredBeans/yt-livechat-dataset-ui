import { getChannels, getLiveChatData, getLiveChatIds } from "../libs/firestore.mjs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"
import ogs from "open-graph-scraper"
import _ from "lodash"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = __dirname + "/../data/"

const writeJsonFile = (target, data) => {
  fs.writeFileSync(DATA_PATH + `${target}.json`, JSON.stringify(data))
}

const createDir = (dir) => {
  try {
    fs.mkdirSync(DATA_PATH + `${dir}`)
  } catch (error) {
    console.log('error creating directory')
  }
}

const checkDir = dir => {
  return fs.existsSync(DATA_PATH + dir)
}

const getLiveUrl = id => {
  return `https://www.youtube.com/watch?v=${id}`
}

const getLiveThumbnail = id => {
  return `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`
}

const getSavedLives = (channelSlug) => {
  const channelDir = DATA_PATH + `${channelSlug}`
  if (fs.existsSync(channelDir)) {
    const cacheFile = fs.readFileSync(channelDir + "/liveIds.json");
    return JSON.parse(cacheFile);
  }
}

const saveLiveChatIds = async (channelSlug, channelId) => {
  const liveChatIds = await getLiveChatIds(channelId)
  const savedLiveChats = getSavedLives(channelSlug)
  // Only save the liveChat that has not been saved yet
  const filteredLiveChatIds = liveChatIds.filter(liveId => {
    return !savedLiveChats.some(savedLive => savedLive.id === liveId)
  })
  console.log('filteredLiveChatIds', filteredLiveChatIds)
  const formattedLiveChatIds = await Promise.all(filteredLiveChatIds.map(async id => {
    const url = getLiveUrl(id)
    const liveChatObj = {
      id,
      url,
      thumbnail: getLiveThumbnail(id),
      title: "Judul tidak ditemukan",
    }
    try {
      const {result} = await ogs({url})
      if (result.success) {
        result.ogTitle ? liveChatObj.title = result.ogTitle : null
      }
    } catch (error) {
      console.log(`error while fetching meta for: ${url}`)
    }
    return liveChatObj
  }))
  writeJsonFile(`${channelSlug}/liveIds`, [...savedLiveChats, ...formattedLiveChatIds])
}

const saveLiveChatData = async (channel, liveId) => {
  const {id: channelId, slug} = channel;
  const targetDir = `${slug}/history/${liveId}`
  if (checkDir(targetDir + ".json")) {
    console.log(`Livechat with id ${liveId} is already saved`)
    return
  }
  const liveChatData = await getLiveChatData(channelId, liveId);
  // Remove duplicate data
  const uniqLiveChatData = _.uniqWith(liveChatData, _.isEqual)
  writeJsonFile(targetDir, uniqLiveChatData)
}

const collect = async () => {
  const channels = await getChannels();
  writeJsonFile('channels', channels)
  const promisedMap = channels.map(async (channel) => {
    createDir(channel.slug)
    await saveLiveChatIds(channel.slug, channel.id)
  })
  await Promise.all(promisedMap)
  // await saveLiveChatIds('anonim', 'UCaMKaSneK--9QLtkDlj2dag')
  // Get liveChat data per liveChatIds
  // await saveLiveChatData({"id":"UCRBgZ9ondGvlcR-E_snJY2Q","name":"WxC Indonesia","link":"https://www.youtube.com/channel/UCRBgZ9ondGvlcR-E_snJY2Q","slug":"wxc-indonesia"}, "-SGfHmTKfp4")
  const newPromisedMap = channels.map(async (channel) => {
    const savedLives = getSavedLives(channel.slug)
    await Promise.all(savedLives.map(async live => {
      await saveLiveChatData(channel, live.id)
    }))
  })
  await Promise.all(newPromisedMap)
}

collect()