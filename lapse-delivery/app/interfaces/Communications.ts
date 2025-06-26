export default interface NotificationInterface{
    id:string;
    title:string;
    date:string;
}
export interface ChatInterface{
    id:string;
    place:string;
    date_created:string;
    date_updated:string;
    status?:string;
}