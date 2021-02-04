import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YootubeResponse } from './../models/yootube.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YootubeService {

    private yootubeUrl = 'https://www.googleapis.com/youtube/v3';
    private apiKey = 'AIzaSyAVCd71NGcl_zBhwARK1M5tm7Ob0wxasTg';
    private playlist = 'UUaY_-ksFSQtTGk0y1HA_3YQ';
    private nextPageToken = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.yootubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults','10')
      .set('playlistId',this.playlist)
      .set('key',this.apiKey)

    return this.http.get<YootubeResponse>(url,{params})
      .pipe(
        map(resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => {
          return items.map(video => video.snippet);
        })
      )
  }
}
