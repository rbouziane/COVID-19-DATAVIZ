import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CovidData } from  '../covid-data.service';


@Component({
  selector: 'app-confirmed-cases',
  templateUrl: './confirmed-cases.component.html',
  styleUrls: ['./confirmed-cases.component.scss'],
})
export class ConfirmedCasesComponent implements OnInit {

  public dataSet: any=[];
  public country: string;
  public totalCases: number=0;

  constructor(private service: CovidData) {
  }

  ngOnInit(): void {
    this.service.getData().subscribe(v => {
      for(let val in v){
        this.dataSet.push(v[val]);
        this.totalCases+=parseInt(v[val].cases.replace(",",""));
      }
    });
    console.log(this.dataSet);
  }

}
