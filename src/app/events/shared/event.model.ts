export class Event {
    id: string;
    activityType: string;
    description: string;
    createDate: string;
    createdBy: string;
    dueDate: string;
    reminder: string;
    priority: string;
    status: string;
    owner: string;
    accountID: string;

    constructor(options: any) {
        this.activityType = options.activityType;
        this.description = options.description;
        this.createDate = options.createDate;
        this.createdBy = options.createdBy;
        this.dueDate = options.dueDate;
        this.reminder = options.reminder;
        this.priority = options.priority;
        this.status = options.status;
        this.owner = options.owner;
        this.id = options.id;
        this.accountID = options.accountID;
    }
}
