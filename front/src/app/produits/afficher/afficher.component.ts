import { Produit } from '../../produit';
import { Component, OnInit, Input } from '@angular/core';
import { ProduitService } from '../../produit.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-afficher',
  templateUrl: './afficher.component.html',
  styleUrls: ['./afficher.component.css']
})
export class AfficherComponent implements OnInit {

  id: number;
  produit: Produit;

  constructor(private route: ActivatedRoute,private router: Router,
    private produitService: ProduitService) { }

  ngOnInit() {
    
    this.produit = new Produit();

    this.id = this.route.snapshot.params['id'];
    
    this.produitService.getProduit(this.id)
      .subscribe(data => {
        console.log(data)
        this.produit = data;
      }, error => console.log(error));
      
  }

  list(){
    this.router.navigate(['produits']);
  }

}