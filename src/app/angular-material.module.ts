import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
   imports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule
   ],
   exports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule
   ]
})

export class AngularMaterialModule { }