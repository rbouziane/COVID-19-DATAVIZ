import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CovidData } from  '../covid-data.service';

@Component({
  selector: 'app-number-dead',
  templateUrl: './number-dead.component.html',
  styleUrls: ['./number-dead.component.scss']
})
export class NumberDeadComponent implements OnInit {

  public dataSet: any=[];
  public country: string;
  public totalDeaths: number=0;
  public newDeaths: number=0;

  constructor(private service: CovidData) { }

  ngOnInit(): void {
    this.service.getData().subscribe(v => {
      for(let val in v){
        this.dataSet.push(v[val]);
        this.newDeaths+=parseInt(v[val].new_deaths.replace(",",""));
        this.totalDeaths+=parseInt(v[val].deaths.replace(",",""));
      }
    });
    console.log(this.dataSet);
  }

}
