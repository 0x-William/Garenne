import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../providers/translate.service';

@Pipe({
  name: 'trans',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
    
  }

  transform(tag: string) {
    return this.translateService.get(tag);
  }
}