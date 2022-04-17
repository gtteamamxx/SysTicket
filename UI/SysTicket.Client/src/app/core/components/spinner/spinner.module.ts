import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from "@angular/platform-browser";
import { SpinnerComponent } from "./spinner.component";

@NgModule({
    imports: [BrowserModule, MatProgressSpinnerModule],
    declarations: [SpinnerComponent]
})
export class SpinnerModule { }
