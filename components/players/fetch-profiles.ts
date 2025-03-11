// 直接导入 JSON 文件
import profileData from '~/public/profile.json'

export interface ProfileData {
  id: number
  base64: string
}

export async function fetchProfiles(): Promise<ProfileData[]> {
  // 直接返回导入的数据
  return profileData
} 