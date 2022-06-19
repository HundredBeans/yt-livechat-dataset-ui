import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = __dirname + "/../data"

export const getLiveUrl = id => {
  return `https://www.youtube.com/watch?v=${id}`
}

export const getLiveThumbnail = id => {
  return `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`
}

export const getSavedChannels = () => {
  if (fs.existsSync(DATA_PATH)) {
    const cacheFile = fs.readFileSync(DATA_PATH + "/channels.json");
    return JSON.parse(cacheFile);
  }
}

export const getSavedLives = (channelSlug) => {
  const channelDir = DATA_PATH + `/${channelSlug}`
  if (fs.existsSync(channelDir)) {
    const cacheFile = fs.readFileSync(channelDir + "/liveIds.json");
    return JSON.parse(cacheFile);
  }
}