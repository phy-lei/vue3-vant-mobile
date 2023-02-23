export interface MenuListItemDto {
  roleopid: number;
  roleid: number;
  opid: number;
  credate?: any;
  opcode?: any;
  opname: string;
  homeurl: string;
  modulename: string;
  menu: string;
  ishasdtl?: any;
  opmodel: string;
  iconPath: string;
  commonlyused: boolean;
}

export interface MenuListDto {
  客户管理: MenuListItemDto[];
  报表: MenuListItemDto[];
  订单管理: MenuListItemDto[];
  活动申请: MenuListItemDto[];
  信息上报: MenuListItemDto[];
  终端拜访: MenuListItemDto[];
  业务辅导: MenuListItemDto[];
}

export interface UserInfoDto {
  token: string;
  headPortraitUrl: string;
  sex: string;
  mobile: string;
  name?: any;
  qywxUserId?: any;
  employeeId: number;
  companyId?: any;
  webpass?: any;
  deptid: number;
  deptname: string;
  pointflag: string;
  platform?: any;
  erpname?: any;
}
