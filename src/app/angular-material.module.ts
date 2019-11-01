import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
   imports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatCardModule
   ],
   exports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatCardModule
   ]
})

export class AngularMaterialModule { }