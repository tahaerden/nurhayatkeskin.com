import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.posts = [];
    for (let i = 1; i < 10; i++) {
      this.http.get(`assets/blog/blog${i}.txt`, { responseType: 'text' }).subscribe(
        (data) => {
          const headerPos = data.indexOf('\r\n');
          const header = data.slice(0, headerPos);
          const content = data.slice(headerPos);
          // const header = data.split('\r\n')[0];
          // const content = data.split('\r\n').slice(1).join('\r\n');
          this.posts.push({
            header,
            content
          });
        },
        (error) => of(false)
      );
    }
  }
}
