import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { InstaMedia } from '../models/InstaMedia';
import { InstaPost } from '../models/instaPost';

@Injectable({
  providedIn: 'root'
})
export class InstagramMediaService {

  accessToken: string = 'EAAaaJLQXL3IBAEuGs3PYEiE3Kony7tBDkA3RXvJtW9QtHUypzkhnb83rjZCRnSnZA8MqNbeRAuHLtnFK8tsmsL0A1O9hn97K2TpZAgqMWvBPZCrCLfZAeqdUqH1jeZC3TErlFrMqeCgrUfbO0NZAMmWqypxbgwNLcTnk3H9RItsbkebCGUXfGZBASXq8hK1PtgIkGvxEtmUAn2aopy2Nw036';
  private url = 'http://localhost:3000/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  instaPosts: InstaPost[] = [];
  instaPostsNext = '';


  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<InstaPost>(`https://graph.facebook.com/v15.0/17841445310775921/media?access_token=EAAaaJLQXL3IBAEuGs3PYEiE3Kony7tBDkA3RXvJtW9QtHUypzkhnb83rjZCRnSnZA8MqNbeRAuHLtnFK8tsmsL0A1O9hn97K2TpZAgqMWvBPZCrCLfZAeqdUqH1jeZC3TErlFrMqeCgrUfbO0NZAMmWqypxbgwNLcTnk3H9RItsbkebCGUXfGZBASXq8hK1PtgIkGvxEtmUAn2aopy2Nw036&pretty=1&limit=25&after=QVFIUmFvT19qRW0wUW15M01jamc0RG15MUF6V1JXRVk0d202MEdIa0Y0ZAS1jckhTVElMMDd1R293TkxEYkY2SVJVRGhNZA1p5el9lNjVyUW1oanp1VV90UV9R`).subscribe((res: any) => {
      this.instaPosts = res.data.map(
        (post: InstaPost) => 
        new InstaPost(post.id, [])
      )

      res.data.forEach((element, i:number) => {
        this.http.get(`https://graph.facebook.com/v15.0/${element.id}/children?fields=media_url&access_token=${this.accessToken}`).subscribe((res: any) => {
          res.data.forEach(el => {
            this.instaPosts[i].carousel.push(el.media_url);
          });

        })
      })
      this.instaPostsNext = res.paging.next;
      console.log(this.instaPostsNext);
      console.log(this.instaPosts);
    });
  }

  logPosts() {
    console.log(this.instaPosts);

  }

  writePosts(posts) {
    posts.forEach(post => {
      if (post.carousel.length > 0) {
        this.http.post(this.url + '/product', JSON.stringify(post), this.httpOptions).pipe(
          catchError(this.errorHandler)
        ).subscribe(res => {
          console.log(res);
        })
      }


    })


    // posts.forEach(element => {
    //   this.http.post(this.url + '/product', JSON.stringify(element), this.httpOptions).pipe(
    //     catchError(this.errorHandler)
    //   ).subscribe(res => {
    //     console.log(res);
    //   })
    // })
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
