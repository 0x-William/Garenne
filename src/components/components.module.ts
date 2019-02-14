import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LoadingContainer } from './loading-container/loading-container';
import { NavHeader } from './nav-header/nav-header';

@NgModule({
	declarations: [
		LoadingContainer,
		NavHeader
	],
	imports: [
		IonicModule
	],
	exports: [
		LoadingContainer,
		NavHeader
	]
})
export class ComponentsModule {}
