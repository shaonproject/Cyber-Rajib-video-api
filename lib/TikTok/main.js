const axios = require('axios');
const useragent = require('../Other/data/useragent.json')
async function findID(url) {
  var unshortener = require("unshorten.it");
  const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
  if(url.indexOf('vt.tiktok.com') !== 0 || url.indexOf('vm.tiktok.com') !== 0) {
    linkO = await unshortener(url)
  }
  const basicParsed = basicReg.exec(linkO);
  if (basicParsed && basicParsed.length > 2) {
    return basicParsed[2]
  }
  return undefined;
}

const searchVideo = async (keywords) => {
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
  };
  var response = await axios(`https://m.tiktok.com/api/search/general/full/?keyword=${encodeURI(keywords)}`, {
    headers: headers,
  });
  var data = await response.data
  var getData = data.data
  var result = []
  for(let data of getData) {
    if(data.type !== 1) continue
    var format =  {
      id: data.item.id,
      desc: data.item.desc,
      createTime: data.item.createTime,
      stats: data.item.stats,
      video: data.item.video,
      author: data.item.author,
      music: data.item.music,
      challenges: data.item.challenges
    }
    result.push(format)
  }
  return result
};

const getData = async (url) => {
  var id = await findID(url);
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
  };
  var response = await axios.get('https://api-m.tiktok.com/aweme/v1/aweme/detail/?aweme_id=' + id, {
    headers: headers,
  });
  var data = await response.data
  var dataAweme = data.aweme_detail
  return {
    statusCode: data.status_code,
    itemData: {
      id: dataAweme.aweme_id,
      aweme_id: dataAweme.video.bit_rate[0].play_addr.uri,
      desc: dataAweme.desc,
      create_time: dataAweme.create_time,
      statistics: dataAweme.statistics,
      music: {
        id: dataAweme.music.id,
        title: dataAweme.music.title,
        author: dataAweme.music.author,
        play_url: dataAweme.music.play_url.uri,
        duration: dataAweme.music.duration
      },
      video: {
        duration: dataAweme.video.duration,
        dynamic_cover: dataAweme.video.dynamic_cover,
        width: dataAweme.video.bit_rate[0].play_addr.width,
        height: dataAweme.video.bit_rate[0].play_addr.height,
        ratio: dataAweme.video.ratio,
        no_watermark: {
          hd: {
            bit_rate: dataAweme.video.bit_rate[0].bit_rate,
            data_size: dataAweme.video.bit_rate[0].play_addr.data_size,
            url: dataAweme.video.bit_rate[0].play_addr.url_list[0]
          },
          sd: {
            bit_rate: dataAweme.video.bit_rate[1].bit_rate,
            data_size: dataAweme.video.bit_rate[1].play_addr.data_size,
            url: dataAweme.video.bit_rate[1].play_addr.url_list[0]
          }
        },
        video_watermark: {
          hd: {
            data_size: dataAweme.video.download_suffix_logo_addr.data_size,
            url: dataAweme.video.download_suffix_logo_addr.url_list[0]
          },
          sd: {
            data_size: dataAweme.video.download_addr.data_size,
            url: dataAweme.video.download_addr.url_list[0]
          }
        }
      }
    }
  }
};
const getInfoUser = async (username) => {
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
  };
  var { data } = await axios.get(`https://www.tiktok.com/node/share/user/@${username}?aid=1988`, {
    headers: headers,
  });
  return {
    statusCode: data.statusCode,
    userInfo: {
      user: data.userInfo.user,
      stats: data.userInfo.stats
    }
  }
}

module.exports = {
  getData,
  searchVideo,
  getInfoUser
}