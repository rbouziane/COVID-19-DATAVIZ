import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CovidData } from  '../covid-data.service';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.scss']
})
export class RecoveredComponent implements OnInit {

  public dataSet: any=[];
  public country: string;
  public totalRecovered: number=0;

  constructor(private service: CovidData) { }

  ngOnInit(): void {
    this.service.getData().subscribe(v => {
      for(let val in v){
        this.dataSet.push(v[val]);
        this.totalRecovered+=parseInt(v[val].total_recovered.replace(",",""));
      }
    });
    console.log(this.dataSet);
  }
}
