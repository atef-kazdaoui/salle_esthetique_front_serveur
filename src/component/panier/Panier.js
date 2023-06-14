import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './panier.css';
import carte from './cartebleu.jpg';
import carte2 from './cartebleu2.png';

function Panier() {
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantites, setQuantites] = useState([]);
  const [showPanierModal, setShowPanierModal] = useState(false); // État pour afficher/masquer le modal de panier
  const [showPaiementModal, setShowPaiementModal] = useState(false); // État pour afficher/masquer le modal de paiement
  const { id } = useParams();

  const handleViderPanier = () => {
    setShowPanierModal(true); // Afficher le modal de panier lorsque le bouton est cliqué
  };

  const handleModalClose = () => {
    setShowPanierModal(false); // Masquer le modal de panier lorsque l'utilisateur clique sur "Fermer"
    setShowPaiementModal(false); // Masquer le modal de paiement lorsque l'utilisateur clique sur "Fermer"
  };

  const handleModalConfirm = () => {
  // Logique pour vider le panier
  axios
    .delete (`http://162.19.25.151:5000/panier/delete/${id}`)
    .then (response => {
      alert ('Le panier a été vidé avec succès !');
      setShowPanierModal (false);
      window.location.reload (); // Masquer le modal de panier après avoir vidé le panier
    })
    .catch (error => {
      console.log (error);
    });
};


  const handleConfirmerPanier = () => {
    setShowPaiementModal(true); // Afficher le modal de paiement lorsque le bouton est cliqué
  };

  const handlePaiement = () => {
    // Logique de traitement du paiement
    // Ajoutez ici votre code pour gérer le paiement avec les informations de la carte bancaire
    alert('Paiement effectué avec succès !');
    setShowPaiementModal(false); // Masquer le modal de paiement après le paiement
  };

  const handleQuantiteChange = (index, event) => {
    const newQuantites = [...quantites];
    newQuantites[index] = parseInt(event.target.value, 10);
    setQuantites(newQuantites);

    // Recalculate the total based on the updated quantities
    let totalPrice = 0;
    newQuantites.forEach((quantity, i) => {
      const produit = produits[i];
      totalPrice += produit.prix_produit * quantity;
    });
    setTotal(totalPrice);
  };

  useEffect(() => {
    axios
      .get(`http://162.19.25.151:5000/panier/findP/${id}`)
      .then((response) => {
        setPanier(response.data);

        const produitsArray = [];
        let totalPrice = 0;
        const quantitesArray = []; // Nouveau tableau pour stocker les quantités
        response.data.forEach((item) => {
          const idProduit = item.id_produit;

          axios
            .get(`http://162.19.25.151:5000/produit/find/${idProduit}`)
            .then((response) => {
              response.data.client['quantite'] = item.quantite;
              produitsArray.push(response.data.client);
              totalPrice +=
                response.data.client.prix_produit * item.quantite;
              quantitesArray.push(item.quantite); // Ajouter la quantité au tableau
              setTotal(totalPrice);
              setProduits(produitsArray);
              setQuantites(quantitesArray); // Définir les quantités
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="panier">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>nom du produit</th>
              <th>prix du produit</th>
              <th>image du produit</th>
              <th>quantite</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <tr key={produit.idproduit}>
                <td>{produit.nom_produit}</td>
                <td>{produit.prix_produit}</td>
                <td>
                  <img
                    src={"http://162.19.25.151:5000/images/" + produit.image}
                    alt="produit"
                    width="80"
                    height="100"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantites[index]}
                    onChange={(event) => handleQuantiteChange(index, event)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Total</td>
              <td>{total.toFixed (2)}</td>;

            </tr>
          </tbody>
        </Table>

        <div className="button-container">
          <button id="atef" onClick={handleViderPanier}>
            <h4>Vider le panier</h4>
          </button>

          <button id="atef" onClick={handleConfirmerPanier}>
            <h4>Confirmer le panier et passer au paiement</h4>
          </button>
        </div>
      </div>

      {/* Modal pour la confirmation de vider le panier */}
      <Modal show={showPanierModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir vider le panier ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Vider le panier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour le formulaire de carte bancaire */}
      <Modal show={showPaiementModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Paiement en carte bancaire</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action=" ">
            <div className="paiement">
              <div className="form-group">
                <label>Nom :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Prénom :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Numéro de carte :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>CVC :</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="logo-container">
            <img src={carte} alt="Carte Bleue" className="card-logo" />
            <img src={carte2} alt="Visa" className="card-logo" />
          </div>
          <Button variant="secondary" onClick={handleModalClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handlePaiement}>
            Payer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Panier;
