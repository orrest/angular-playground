import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-player',
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent {
  clickToPlay = signal(true);

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  onClick() {
    if (this.clickToPlay()) {
      this.audio.nativeElement.play()
        .then(
          () => { console.log('start to play') },
          (reason) => { console.log(reason) });
    } else {
      this.audio.nativeElement.pause();
    }

    this.clickToPlay.set(!this.clickToPlay());
  }
}
