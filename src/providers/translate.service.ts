import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TranslateService {

  private translations: object;

  constructor(private http: Http) {

  }

  private getTrans(tag: string, translations: object): string {
    if (!translations) {
      return tag;
    }

    const arrTag = tag.split(".");
    const tag0 = arrTag.shift();
    const trans = translations[tag0];
    if (arrTag.length == 0) {
      return trans || tag;
    }
    return this.getTrans(arrTag.join('.'), trans);
  }
  
  get(tag: string): string {
    return this.getTrans(tag, this.translations);
  }

  load(lang: string): Promise<void> {
    return this.http.get(`./assets/lang/${lang}.json`)
      .toPromise()
      .then(response => response.json())
      .then(data => {
        this.translations = data;
      });
  }
  
}
