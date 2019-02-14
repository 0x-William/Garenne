import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'html',
})
export class HtmlPipe implements PipeTransform {
  constructor(private dom: DomSanitizer) {
    
  }

  transform(html: string) {
    return this.dom.bypassSecurityTrustHtml(html);
  }
}