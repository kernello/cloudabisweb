export class QueryParams {
    paramName: string;
    paramValue: any;

    constructor(paramName: string, paramValue: any) {
        this.paramName = paramName ? paramName : "";
        this.paramValue = paramValue ? paramValue : "";
    }
}

export class ApiQueryParam {
    public paramName: string;
    public paramValue: any;
  
    constructor(paramName: string, paramValue: any) {
      this.paramName = paramName;
      this.paramValue = paramValue;
    }
  }


  