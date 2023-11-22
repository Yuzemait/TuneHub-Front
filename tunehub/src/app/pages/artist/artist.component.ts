import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: any;
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {}

  }

    