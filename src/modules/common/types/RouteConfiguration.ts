export interface RouteConfiguration {
  path: string;
  generatePath: (params?: {
    [paramName: string]: string | number | boolean | undefined;
  }) => string;
}
