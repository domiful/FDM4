export class Contact {
    name: string;
    department: string;
    jobTitle: string;
    email: string;
    phone: string;
    cellphone: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    accountID: string;
    id: string;
    imageUrl: string;


    constructor(options: any) {
        this.department = options.department;
        this.name = options.name;
        this.jobTitle = options.jobTitle;
        this.email = options.email;
        this.phone = options.phone;
        this.cellphone = options.cellphone;
        this.address1 = options.address1;
        this.address2 = options.address2;
        this.city = options.city;
        this.zip = options.zip;
        this.id = options.id;
        this.accountID = options.accountID;
        this.imageUrl = "https://balproductions.org/wp-content/uploads/2017/09/generic-headshot.png";

    }
}
