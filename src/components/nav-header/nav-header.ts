import { Component, Input } from "@angular/core";

@Component({
    selector: "nav-header",
    templateUrl: "nav-header.html",
})
export class NavHeader {
    @Input() title: string;
}
