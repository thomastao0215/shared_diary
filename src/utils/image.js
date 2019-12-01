import config from 'utils/config'

const { uploadUrl } = config

/**
 * 获取远程图片地址
 * 如，const icon1 = getImageUrl('slice/location/icon_location.png')
 * @param {*} path slice/location/icon_location.png
 */
export function getImageUrl(path) {
  return `${uploadUrl}${path}`
}
