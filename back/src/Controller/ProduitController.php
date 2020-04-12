<?php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Produit;
use App\Form\ProduitType;
/**
 * Produit controller.
 * @Route("/api", name="api_")
 */
class ProduitController extends FOSRestController
{
  /**
   * Lists all Produits.
   * @Rest\Get("/produits")
   *
   * @return Response
   */
  public function getProduitAction()
  {
    $repository = $this->getDoctrine()->getRepository(Produit::class);
    $produits = $repository->findall();
    return $this->handleView($this->view($produits));
  }

  /**
  *@Rest\Delete("/produit/{id}")
  */

  public function deleteAction($id){

    $produit = new Produit;
    $em = $this->getDoctrine()->getManager();
    $data = $this->getDoctrine()->getRepository("App:Produit")->find($id);
    //dd($data);
    $em->remove($data);
    $em->flush();

    $repository = $this->getDoctrine()->getRepository(Produit::class);
    $produits = $repository->findall();
    return $this->handleView($this->view($produits));
  }

  /**
  *@Rest\Get("/produit/{id}")
  */

  public function viewAction($id){

    $produit = new Produit;
    $em = $this->getDoctrine()->getManager();
    $produits = $this->getDoctrine()->getRepository("App:Produit")->find($id);
    
    return $this->handleView($this->view($produits));
  }

  
  /**
   * Create Produit.
   * @Rest\Post("/produits")
   *
   * @return Response
   */
  
  public function postProduitAction(Request $request)
  {
    $produit = new Produit();
    $form = $this->createForm(ProduitType::class, $produit);
    $data = json_decode($request->getContent(), true);
    $form->submit($data);
    if ($form->isSubmitted() && $form->isValid()) {
      $em = $this->getDoctrine()->getManager();
      $em->persist($produit);
      $em->flush();
      return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
    }
    return $this->handleView($this->view($form->getErrors()));
  }

  /**
  *@Rest\Put("/produit/{id}")
  */
  public function updateAction($id, Request $request){

    $data = new Produit;
    $nom = $request->get("nom");
    $prix = $request->get("prix");
    $quantite = $request->get("quantite");
    $description = $request->get("description");
    $em = $this->getDoctrine()->getManager();
    $produit = $this->getDoctrine()->getRepository("App:Produit")->find($id);

    $produit->setNom($nom);
    $produit->setPrix($prix);
    $produit->setQuantite($quantite);
    $produit->setDescription($description);

    $em->flush();

    return new View("Updated!!", Response:: HTTP_OK);
  }
  
}