import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './produits/ajout-produit/ajout-produit.component';
import { ModifierProduitComponent } from './produits/modifier-produit/modifier-produit.component';
import { AfficherComponent } from './produits/afficher/afficher.component';


const routes: Routes = [
  {path: '', redirectTo: 'produits', pathMatch:'full'},
  {path:'produits', component:ProduitsComponent },
  {path:'ajout',component:AjoutProduitComponent},
  {path: 'modifier/:id', component:ModifierProduitComponent},
  {path: 'afficher/:id', component:AfficherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
