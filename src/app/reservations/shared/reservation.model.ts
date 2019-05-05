export class Reservation {
    id: string;
    name: string;
    imageUrl: string;
    date: string;
    location: string;
    created: Date;
    party: number;
    checkedIn: boolean;
    tableReady: boolean;
    time: string;


    constructor(options: any) {
        this.id = options._id;
        this.name = options.name;
        this.imageUrl = "https://cms-assets.tutsplus.com/uploads/users/34/posts/30128/preview_image/reservations.jpg";
        this.date = new Date(options.date).toDateString();
        this.location = options.location;
        this.created = options.dateMade;
        this.party = options.party;
        this.checkedIn = options.checkedIn;
        this.tableReady = options.tableReady;
        this.time = options.time;

    }
}
