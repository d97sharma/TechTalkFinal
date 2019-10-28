import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
   imports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule
   ],
   exports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule
   ]
})

export class AngularMaterialModule { }