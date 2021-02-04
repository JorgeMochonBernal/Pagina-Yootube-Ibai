import { Component, OnInit } from '@angular/core';
import { YootubeService } from './../../services/yootube.service';
import { Video } from './../../models/yootube.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private yootubeService:YootubeService) { }

  videos:Video[] = [];

  ngOnInit(): void {
    this.yootubeService.getVideos()
      .subscribe(resp => {
        this.videos.push(...resp);
      })
  }

  cargarVideo() {
    this.yootubeService.getVideos()
      .subscribe(resp => {
        this.videos.push(...resp);
      });
  }

  mostrarVideo(video: Video ) {
    Swal.fire({
      html:  `
        <h4>${video.title}</h4>
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/${video.resourceId.videoId}"
              frameborder="0"
               allow="accelerometer; autoplay;
               clipboard-write; encrypted-media;
               gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
          `
    });
  }

}
