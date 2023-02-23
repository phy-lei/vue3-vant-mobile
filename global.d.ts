declare global {
  type PromiseReturnType<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer R>
    ? R
    : ReturnType<T>;



  interface IGlobalAPI {


    $openMapDialog(params: { initLocation: string } & Record<string, any>): Promise<{ address: string, location: string, adcode: string } | null>;

    $closeMapDialog(): void;

  }

  // 继承 ComponentInternalInstance 接口
  interface ICurrentInstance extends ComponentInternalInstance {
    appContext: {
      config: { globalProperties: IGlobalAPI };
    };
  }
}


export { };
