module h5.application {
    export interface ILBLCUSModule {
        
        reload: boolean;
        transactionStatus: {
            //itemMasterList: boolean;
            LBLCUSList : boolean,
            LBLCUSRecord : boolean,
          //  LBLCUSColumnNamesRecord : boolean;//for column names
            
        };
      
        
         LBLCUSList: any; //list of table names
        LBLCUSListGrid: IUIGrid;
        
        selectedLBLCUSListRow: any;
         LBLCUSRecord: any;
        loadLBLCUSRecordModule: any; //the function that will be called when a selection is made
        rcid : string;
        //  LBLCUSColumnNamesRecord: any;// for column names
    }
}