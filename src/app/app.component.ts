import { Component, OnInit, ElementRef, Input, Inject, ViewEncapsulation } from '@angular/core';

declare var jQuery: any;
declare var $: any;
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private dataJson = [{ "id": "1001", "name": "Wael", "account": "3900", "max_per_week": "600", "is_gold": true },
  { "id": "1002", "name": "Alex", "account": "2490", "max_per_week": "400", "is_gold": false },
  { "id": "1003", "name": "Romain", "account": "5775", "max_per_week": "800", "is_gold": true },
  { "id": "1004", "name": "Saif", "account": "2233", "max_per_week": "360", "is_gold": false },
  { "id": "1005", "name": "Patrick", "account": "56", "max_per_week": "10" },
  { "id": "2001", "name": "Laurence", "account": "3900", "max_per_week": "600", "is_gold": true },
  { "id": "2002", "name": "Gaelle", "account": "2490", "max_per_week": "400", "is_gold": false },
  { "id": "2003", "name": "Paul", "account": "5775", "max_per_week": "800", "is_gold": true },
  { "id": "2004", "name": "Mohamed", "account": "2233", "max_per_week": "360", "is_gold": false },
  { "id": "2005", "name": "Olivier", "account": "56", "max_per_week": "10" }];
  private el: ElementRef;
  constructor(@Inject(ElementRef) el: ElementRef) {
    this.el = el;
  }

  ngAfterViewInit() {
    let container = this.el.nativeElement;
    let inst = jQuery(container);
    let targetElement = inst.find("#output");

    var sum = $.pivotUtilities.aggregatorTemplates.sum;
    var Sum = function () { return sum()(["account"]); }

    targetElement.pivotUI(
      //data : json array of fake objects
      this.dataJson,
      {
        aggregators: { Sum },
        // initial colomns and rows of the pivot table
        rows: ["name"], cols: ["account"],
        vals: ["account"],
        aggregatorName: "Sum",
        rendererName: "Table",
        rendererOptions: {
          table: {
            clickCallback: function (e, value, filters, pivotData) {
              var names = [];
              pivotData.forEachMatchingRecord(filters,
                function (record) { names.push(record.account); });
              alert(value);
            }
          }
        }
      }, true);
  }
}
