export const charString = (char: string, count: number): string => {
  let str = '';
  while (count--) {
    str += char;
  }
  return str;
};

export const dateFormat = (date?: any, format?: string): string => {
  let _date = new Date();
  let _format;
  //无参数
  if (date == undefined && format == undefined) {
    _date = new Date();
    _format = 'yyyy-MM-dd HH:mm:ss';
  }
  //无日期
  else if (typeof date == 'string') {
    _format = date;
    _date = new Date();
  }
  //无格式化参数
  else if (format === undefined) {
    _format = 'yyyy-MM-dd HH:mm:ss';
  } else {
    _date = date;
    _format = format;
  }
  //没有分隔符的特殊处理

  const map: any = {
    y: _date.getFullYear() + '', //年份
    M: _date.getMonth() + 1 + '', //月份
    d: _date.getDate() + '', //日
    H: _date.getHours(), //小时 24
    m: _date.getMinutes() + '', //分
    s: _date.getSeconds() + '', //秒
    q: Math.floor((_date.getMonth() + 3) / 3) + '', //季度
    f: _date.getMilliseconds() + '', //毫秒
  };
  //小时 12
  if (map['H'] > 12) {
    map['h'] = map['H'] - 12 + '';
  } else {
    map['h'] = map['H'] + '';
  }
  map['H'] += '';

  const reg = 'yMdHhmsqf';
  let all = '',
    str = '';
  for (let i = 0, n = 0; i < reg.length; i++) {
    n = _format.indexOf(reg[i]);
    if (n < 0) {
      continue;
    }
    all = '';
    for (; n < _format.length; n++) {
      if (_format[n] != reg[i]) {
        break;
      }
      all += reg[i];
    }
    if (all.length > 0) {
      if (all.length == map[reg[i]].length) {
        str = map[reg[i]];
      } else if (all.length > map[reg[i]].length) {
        if (reg[i] == 'f') {
          str = map[reg[i]] + charString('0', all.length - map[reg[i]].length);
        } else {
          str = charString('0', all.length - map[reg[i]].length) + map[reg[i]];
        }
      } else {
        switch (reg[i]) {
          case 'y':
            str = map[reg[i]].substr(map[reg[i]].length - all.length);
            break;
          case 'f':
            str = map[reg[i]].substr(0, all.length);
            break;
          default:
            str = map[reg[i]];
            break;
        }
      }
      _format = _format.replace(all, str);
    }
  }
  return _format;
};

export const compose = (...fn: ((...args: any[]) => void)[]) =>
  fn.reduce((acc, cur) => {
    return async (...args) => acc(await cur(...args));
  });

// 手动获取URL
export function getUrlKey(name: string, url: string) {
  const json = decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(
      /\+/g,
      '%20'
    )
  );
  return JSON.parse(json) || null;
}
