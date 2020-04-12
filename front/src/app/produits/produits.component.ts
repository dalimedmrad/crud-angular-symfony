import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ProduitService } from "../produit.service";
import { Produit } from "../produit";
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits:Produit[];
  produit:Produit;
  
    constructor(private produitService:ProduitService, private router:Router) { }
  
    ngOnInit() {
      setInterval(() => {
        this.getProduits();
        console.log(this.getProduits);
      }, 3000);
    }
  
  
    getProduits(): void {
      this.produitService.getProduits()
          .subscribe(produits => this.produits = produits);
    }
  
    
  
    deleteProduit(produit:Produit): void {
      this.produitService.deleteProduit(produit).subscribe(
        data => {
          console.log(data);
          this.getProduits();
        },
        error => console.log(error)
      );
      //window.location.replace('/produits');
  
    }
  
    produitDetails(id: number){
      this.router.navigate(['afficher', id]);
    }
  
    EditProduit(id: number){
      this.router.navigate(['modifier', id]);
    }
  
  }