import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {
  MapPoint, Event, Blog,
  Animal, Beacon
} from '../models/models';

@Injectable()
export class ApiService {

  mapImage: string;
  blogs: Array<Blog> = [];
  animals: Array<Animal> = [];
  events: Array<Event> = [];
  
  constructor(private http: Http) {

  }

  private call(endpoint: string): Promise<any> {
    return this.http.get('https://www.lagarenne.ch/fr/mobile/' + endpoint)
      .toPromise()
      .then(response => response.json())
  }

  getData(endpoint: string): Promise<string> {
    return this.call(endpoint)
      .then(data => {
        try {
          return Promise.resolve(data[0][endpoint]);
        } catch(e) {
          return Promise.resolve('');
        }        
      });
  }

  getMapImage(): Promise<string> {
    if (this.mapImage) {
      return Promise.resolve(this.mapImage);
    }
    return this.call('map')
      .then(data => {
        this.mapImage = data;
        return this.getMapImage();
      })
  }

  getPoints(): Promise<Array<MapPoint>> {
    return this.call('points');
  }

  getEvents(): Promise<Array<Event>> {
    return this.call('events')
      .then(data => {
        this.events = data;
        return Promise.resolve(data);
      })
  }

  getBlogList(): Promise<Array<Blog>> {
    return this.call('posts')
      .then(data => {
        this.blogs = data;
        return Promise.resolve(data);
      })
  }

  getBlog(id: number): Blog {
    if (id < this.blogs.length) {
      return this.blogs[id];
    }
    return null;
  }
  
  getAnimalList(): Promise<Array<Animal>> {
    return this.call('animals')
      .then(data => {
        this.animals = data;
        return Promise.resolve(data);
      })
  }

  getAnimal(id: number): Animal {
    if (id < this.animals.length) {
      return this.animals[id];
    }
    return null;
  }

  getBeacons(): Promise<Array<Beacon>> {
    return this.call('beacons');
  }

  getRestaurant(): Promise<string> {
    return this.getData('restaurant');
  }

  getImpressum(): Promise<string> {
    return this.getData('impressum');
  }

  getMission(): Promise<string> {
    return this.getData('mission');
  }

  getReglement(): Promise<string> {
    return this.getData('reglement');
  }

  getHours(): Promise<string> {
    return this.getData('hours');
  }

  getPrices(): Promise<string> {
    return this.getData('prices');
  }

  getGame(): Promise<string> {
    return this.getData('game');
  }

}
