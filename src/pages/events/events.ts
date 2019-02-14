import { Component } from '@angular/core';
import { Event } from '../../models/models';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  events: Array<Event> = [];
  
  constructor(private api: ApiService) {
    this.events = this.api.events;
  }
}
