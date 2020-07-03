import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberDeadComponent } from './number-dead/number-dead.component';
import { ConfirmedCasesComponent } from './confirmed-cases/confirmed-cases.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { ScrollingModule } from "@angular/cdk/scrolling";
import { RecoveredComponent } from './recovered/recovered.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberDeadComponent,
    ConfirmedCasesComponent,
    MapComponent,
    RecoveredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
