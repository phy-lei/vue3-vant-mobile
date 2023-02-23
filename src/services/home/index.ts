import $http from '@/utils/request';
import { MenuListDto, UserInfoDto } from './response.dto';

// 获取菜单列表
export async function getMenusApi(): Promise<MenuListDto> {
  const request = {
    method: 'post',
    url: '/qyWechat/queryMenus',
    data: {},
  } as const;
  try {
    const response = await $http<MenuListDto>(request);
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    if (response.code === 200) {
      return response.data;
    }
    throw response.msg;
  } catch (error) {
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
  }
  return {} as MenuListDto;
}

// 获取菜单列表
export async function genAuthApi({ mobile }: { mobile: number }): Promise<UserInfoDto> {
  const request = {
    method: 'get',
    url: '/test/genAuth',
    params: { mobile },
  } as const;
  try {
    const response = await $http<UserInfoDto>(request);
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    if (response.code === 200) {
      return response.data;
    }
    throw response.msg;
  } catch (error) {
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
  }
  return {} as UserInfoDto;
}
