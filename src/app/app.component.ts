import { Component, OnInit, ElementRef, Input, Inject, ViewEncapsulation } from '@angular/core';

declare var jQuery: any;
declare var $: any;

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
    if (!this.el ||
      !this.el.nativeElement ||
      !this.el.nativeElement.children) {
      console.log('cant build without element');
      return;
    }

    let container = this.el.nativeElement;
    let inst = jQuery(container);
    let targetElement = inst.find("#output");
    var sum = $.pivotUtilities.aggregatorTemplates.sum;
    var Sum = function () { return sum()(["account"]); }
    var __this = this;
    targetElement.pivotUI(
      this.dataJson,
      {
        aggregators: { Sum },
        rows: ["name"], cols: ["account"],
        vals: ["account"],
        aggregatorName: "Sum",
        rendererName: "Table",
        onRefresh: function () {
          __this.onPivotRefresh(__this, targetElement, Sum);
        }
      });
  }

  restore(__this, targetElement, Sum): void {
    let options = JSON.parse(localStorage.getItem("pivotConfig"));
    options["aggregators"] = { Sum };
    options["onRefresh"] = function () {
      __this.onPivotRefresh(__this, targetElement, Sum);
    };
    targetElement.pivotUI(this.dataJson, options, true);
  }

  private MAX_ROWS: number = 3;
  onPivotRefresh(__this, targetElement, Sum) {
    var config = targetElement.data("pivotUIOptions");
    let rowsArray = (config.rows as Array<any>);
    if (rowsArray.length > this.MAX_ROWS) {
      alert("You have to select only " + __this.MAX_ROWS + " ROWs !")
      rowsArray.splice(rowsArray.length - 1, 1);
      var config_copy = JSON.parse(JSON.stringify(config));
      //delete some values which will not serialize to JSON
      delete config_copy["aggregators"];
      delete config_copy["renderers"];
      localStorage.setItem("pivotConfig", JSON.stringify(config_copy));
      __this.restore(__this, targetElement, Sum);
    }
  }

}
