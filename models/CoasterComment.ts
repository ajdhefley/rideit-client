import moment from 'moment';

export class CoasterComment {
    CommentId: number;
    Author: string;
    Body: string;
    Timestamp: Date;
    LikeCount: number;
    
    get TimestampFromNow() {
        return moment(this.Timestamp).fromNow();
    }

    get TimestampStr() {
        return moment(this.Timestamp).format('MMMM Do, YYYY h:mma');
    }
}