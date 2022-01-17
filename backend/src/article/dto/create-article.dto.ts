export class CreateArticleDTO {
    readonly uid: Number;
    readonly title: String;
    readonly author: String;
    readonly url: String;
    readonly daleted: Boolean;
    readonly release_date: Date;
    readonly created_at: Date;
}