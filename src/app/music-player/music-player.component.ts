import { Component, OnInit, signal } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-music-player',
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements OnInit {
  sound!: Howl;

  clickToPlay = signal(true);

  ngOnInit(): void {
    this.sound = new Howl({
      src: ['sound.mp3'],
      html5: true,
      onpause: () => {
        console.log('music pause');
      },
      onend: () => {
        console.log('music stop');
      },
    });

    console.log(this.sound.state());
  }

  onClick() {
    if (this.clickToPlay()) {
      this.sound.play();
    } else {
      this.sound.pause();
    }

    this.clickToPlay.set(!this.clickToPlay());
  }
}
