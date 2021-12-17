import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class SharedModule {}
