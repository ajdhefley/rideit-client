import moment from 'moment';

export class CoasterPageComment {
    commentId: number;
    author: string;
    body: string;
    timestamp: Date;
    likeCount: number;
    
    get timestampFromNow() {
        return moment(this.timestamp).fromNow();
    }

    get timestampStr() {
        return moment(this.timestamp).format('MMMM Do, YYYY h:mma');
    }
}