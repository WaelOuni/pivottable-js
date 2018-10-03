import { Component, OnInit, ElementRef, Input, Inject } from '@angular/core';

declare var jQuery: any;
declare var $: any;
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private el: ElementRef;
  constructor(@Inject(ElementRef) el: ElementRef) {
    this.el = el;
  }

  ngAfterViewInit() {
    let container = this.el.nativeElement;
    let inst = jQuery(container);
    let targetElement = inst.find("#output");
    targetElement.pivotUI(
      //data : json array of fake objects
      [{ "id": "1001", "name": "Wael", "account": "3900", "max_per_week": "600", "is_gold": true },
      { "id": "1002", "name": "Alex", "account": "2490", "max_per_week": "400", "is_gold": false },
      { "id": "1003", "name": "Romain", "account": "5775", "max_per_week": "800", "is_gold": true },
      { "id": "1004", "name": "Saif", "account": "2233", "max_per_week": "360", "is_gold": false },
      { "id": "1005", "name": "Patrick", "account": "56", "max_per_week": "10" }],
      {
        // initial colomns and rows of the pivot table
        cols: ["max_per_week", "account"], rows: ["id", "name"],
      });
  }
}
