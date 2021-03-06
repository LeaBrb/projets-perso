import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CocktailsDetailsComponent } from './cocktails-details/cocktails-details.component';
import { CocktailsListComponent } from './cocktails-list/cocktails-list.component';
import { CocktailContainerComponent } from './cocktail-container.component';
import { CocktailEditComponent } from './cocktail-edit/cocktail-edit.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { cocktailRouting } from './cocktail.routing';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
    declarations:[
        CocktailsDetailsComponent,
        CocktailsListComponent,
        CocktailContainerComponent,
        CocktailEditComponent,
        FilterPipe
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        cocktailRouting,
        SharedModule
    ],
    providers:[],
    exports:[]
})
export class CocktailModule {}