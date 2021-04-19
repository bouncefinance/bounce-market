export interface RouteConfiguration {
  path: string;
  generatePath: (...params: any) => string;
}
