export interface RouteConfiguration<PARAMS = any> {
  path: string;
  generatePath: (...params: any) => string;
  poolType?: () => PARAMS;
  // TODO: modify typing
  useParams?: any;
}
