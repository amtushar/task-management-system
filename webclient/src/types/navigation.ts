export interface IRoute {
    name: string;
    layout: string;
    icon: JSX.Element | string;
    items?: any;
    path: string;
    secondary?: boolean | undefined;
    children?: IRoute[];
  }

  export interface RoutesType {
    name: string;
    layout: string;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean | undefined;
    children?: RoutesType[]; // Add the children property as optional
  }