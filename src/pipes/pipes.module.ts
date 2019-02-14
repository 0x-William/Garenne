import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { HtmlPipe } from './html.pipe';

@NgModule({
	declarations: [
		TranslatePipe,
		HtmlPipe
    ],
	imports: [],
	exports: [
		TranslatePipe,
		HtmlPipe
	]
})
export class PipesModule {}
