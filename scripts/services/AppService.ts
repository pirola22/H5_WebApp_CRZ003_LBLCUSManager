module h5.application {

    export interface IAppService {
        getAuthority(company: string, division: string, m3User: string, programName: string, charAt: number): ng.IPromise<boolean>;
        getDivisionList(company: string, division: string): ng.IPromise<M3.IMIResponse>;
        getWarehouseList(company: string): ng.IPromise<M3.IMIResponse>;
        getFacilityList(company: string, division: string): ng.IPromise<M3.IMIResponse>;
        getLBLCUSTableNames(): ng.IPromise<M3.IMIResponse>;
        lstLBLCUSRecords(): ng.IPromise<M3.IMIResponse>;
        //saveLBLCUSRecord(tableName: string, tableDesc: string, path: string, server: string, folderPath: string, port: string, protocol: string): ng.IPromise<M3.IMIResponse>;
        getAlphaLBLCUSRecord(fileName: string): ng.IPromise<M3.IMIResponse>;
       // getLBLCUSRecord(PK01: string, PK02: string, PK03: string): ng.IPromise<M3.IMIResponse>;
       // deleteCSYTABRecord(keyVal: string, language: string, divi: string): ng.IPromise<M3.IMIResponse>;
       // getLBLCUSColumnNamesRecord(fileName: string): ng.IPromise<M3.IMIResponse>;
        //addLBLCUSRecord(tableName: string, tableDesc: string, path: string, server: string, folderPath: string, port: string, protocol: string): ng.IPromise<M3.IMIResponse>;
         saveLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string, al30: string, al31: string, al32: string, al33: string, al34: string, al35: string, al36: string): ng.IPromise<M3.IMIResponse>;
        saveLBLCUSNumericRecord(pk01: string, pk02: string, pk03: string, n096: number, n196: number, n296: number, n396: number, n496: number, n596: number, n696: number, n796: number, n896: number, n996: number): ng.IPromise<M3.IMIResponse>
        addLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string, al30: string, al31: string, al32: string, al33: string, al34: string, al35: string, al36: string): ng.IPromise<M3.IMIResponse>;
        addLBLCUSNumeric(pk01: number, pk02: number, pk03: number, n096: boolean, n196: boolean, n296: number, n396: boolean, n496: number, n596: number, n696: number, n796: number, n896: number, n996: number): ng.IPromise<M3.IMIResponse>;
        getLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse>;
        getLBLCUSNumericRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse>;
         deleteLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse>;
          deleteLBLCUSNumericRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse>;
        //
    }

    export class AppService implements IAppService {

        static $inject = ["RestService", "$filter", "$q"];

        constructor(private restService: h5.application.IRestService, private $filter: h5.application.AppFilter, private $q: ng.IQService) {
        }

        public getAuthority(company: string, division: string, m3User: string, programName: string, charAt: number): ng.IPromise<boolean> {
            let request = {
                DIVI: division,
                USID: m3User,
                PGNM: programName
            };

            return this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then((val: M3.IMIResponse) => {
                if (angular.equals([], val.items)) {
                    request.DIVI = "";

                    return this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then((val: M3.IMIResponse) => {

                        if (angular.equals([], val.items)) {

                            return false;
                        } else {
                            let test = val.item.ALO;
                            if (charAt < test.length && '1' == test.charAt(charAt)) {
                                return true;
                            } else {
                                return false;
                            }

                        }
                    });
                } else {

                    let test = val.item.ALO;
                    if (charAt < test.length && '1' == test.charAt(charAt)) {
                        return true;
                    } else {

                        return false;
                    }
                }
            });
        }
        public getAlphaLBLCUSRecord(fileName: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
                PK01: fileName,


            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public lstLBLCUSRecords(): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
            };

            return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public getLBLCUSTableNames(): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "LBLCUS",

            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
              public getLBLCUSAlphaRecord(PK01: string, PK02: string, PK03: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
                PK01: PK01,
                PK02: PK02,
                PK03: PK03,


            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }

        public getLBLCUSNumericRecord(PK01: string, PK02: string, PK03: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
                PK01: PK01,
                PK02: PK02,
                PK03: PK03,


            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetNumericKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public getDivisionList(company: string, division: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company,
                DIVI: division
            };
            return this.restService.executeM3MIRestService("MNS100MI", "LstDivisions", requestData).then((val: M3.IMIResponse) => { return val; });
        }

        public getWarehouseList(company: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company
            };
            return this.restService.executeM3MIRestService("MMS005MI", "LstWarehouses", requestData, 0).then((val: M3.IMIResponse) => { return val; });
        }

        public getFacilityList(company: string, division: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company,
                DIVI: division
            };
            return this.restService.executeM3MIRestService("CRS008MI", "ListFacility", requestData).then((val: M3.IMIResponse) => { return val; });
        }



        public getCustomerList(company: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company
            }
            return this.restService.executeM3MIRestService("CRS610MI", "LstByName", requestData).then((val: M3.IMIResponse) => { return val; });
        }


    
        public saveLBLCUSNumericRecord(pk01: string, pk02: string, pk03: string, n096: number, n196: number, n296: number, n396: number, n496: number, n596: number, n696: number, n796: number, n896: number, n996: number): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
                N096: n096,
                N196: n196,
                N296: n296,
                N396: n396,
                N496: n496,
                N596: n596,
                N696: n696,
                N796: n796,
                N896: n896,
                N996: n996,

            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "ChgNumericKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public saveLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string, al30: string, al31: string, al32: string, al33: string, al34: string, al35: string, al36: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
                AL30: al30,
                AL31: al31,
                AL32: al32,
                AL33: al33,
                AL34: al34,
                AL35: al35,
                AL36: al36,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "ChgAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public addLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string, al30: string, al31: string, al32: string, al33: string, al34: string, al35: string, al36: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
                AL30: al30,
                AL31: al31,
                AL32: al32,
                AL33: al33,
                AL34: al34,
                AL35: al35,
                AL36: al36,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "AddAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public addLBLCUSNumeric(pk01: number, pk02: number, pk03: number, n096: boolean, n196: boolean, n296: number, n396: boolean, n496: number, n596: number, n696: number, n796: number, n896: number, n996: number): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
                N096: n096,
                N196: n196,
                N296: n296,
                N396: n396,
                N496: n496,
                N596: n596,
                N696: n696,
                N796: n796,
                N896: n896,
                N996: n996,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "AddNumericKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public deleteLBLCUSAlphaRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "DelAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public deleteLBLCUSNumericRecord(pk01: string, pk02: string, pk03: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "LBLCUS",
                PK01: pk01,
                PK02: pk02,
                PK03: pk03,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "DelNumericKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }

    }
}