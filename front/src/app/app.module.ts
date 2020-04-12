import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './produits/ajout-produit/ajout-produit.component';
import { ModifierProduitComponent } from './produits/modifier-produit/modifier-produit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AfficherComponent } from './produits/afficher/afficher.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    AjoutProduitComponent,
    ModifierProduitComponent,
    AfficherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
