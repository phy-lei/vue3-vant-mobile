let cloudBridge: any
// cloudBridge
export default () => {
  const setCloudBridge = <T>(data: T): T => {
    cloudBridge = data
    return cloudBridge
  }
  return {
    cloudBridge,
    setCloudBridge
  }
}