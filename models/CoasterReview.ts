export class CoasterReview {
    reviewId: number;
    coasterId: number;
    userId: number;
    title: string;
    body: string;
    rating: number;
    timestamp: string;
    author: { username: string };
}
