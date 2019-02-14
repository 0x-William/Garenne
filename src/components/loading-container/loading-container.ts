import { Component, Input } from "@angular/core";

@Component({
    selector: "loading-container",
    templateUrl: "loading-container.html",
})
export class LoadingContainer {
    @Input() loading: boolean;
    @Input() noShadow: boolean;    
}
