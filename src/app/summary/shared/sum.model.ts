export class Sum {
    id: string;
    accountID: string;
    year: string;
    totalSales: string;
    totalUnits: string;
    ecomSales: string;
    ecomUnits: string;


    constructor(options: any) {
        this.id = options._id;
        this.accountID = options.accountID;
        this.year = options.year;
        this.totalSales = options.totalSales;
        this.totalUnits = options.totalUnits;
        this.ecomSales = options.ecomSales;
        this.ecomUnits = options.ecomUnits;
    }
}
