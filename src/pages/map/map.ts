import { Component } from '@angular/core';
import { MapPoint } from '../../models/models';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  loading: boolean;
  imageUrl: string;
  points: Array<MapPoint> = [];

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    Promise.all([
      this.api.getMapImage()
        .then(data => {
          this.imageUrl = data;
        }),
      this.api.getPoints()
        .then(data => {
          this.points = data;
        }),
    ]).then(() => {
      this.loading = false;
    });
  }

}
