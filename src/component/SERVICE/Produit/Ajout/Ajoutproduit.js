import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './Ajoutproduit.css';

const Ajoutproduit = () => {
  const [categories, setCategories] = useState([]);
  const [categorieId, setCategorieId] = useState('');
  const [nom_produit, setNom_produit] = useState('');
  const [description_produit, setDescription_produit] = useState('');
  const [prix_produit, setPrix_produit] = useState('');
  const [nombre_produit, setNombre_produit] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://162.19.25.151:5000/categories/categories')
      .then(res => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('nom_produit', nom_produit);
    formData.append('description_produit', description_produit);
    formData.append('prix_produit', prix_produit);
    formData.append('nombre_produit', nombre_produit);
    formData.append('categorieId', categorieId);

    axios.post(`http://162.19.25.151:5000/produit/ajouter`, formData)
      .then(res => {
        console.log(categorieId);
        console.log(res.data);
        setMessage(res.data.message);
        navigate('/home');
      })
      .catch(error => {
        console.log(error);
        setError(error.response.data);
      });
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className='ajout_produit'>
      <h1>Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="form-ajout">
        <div className='form-container'>
          <div className="form-group">
            <label htmlFor="nom">Nom du produit:</label>
            <input
              type="string"
              placeholder='Nom du produit'
              className="form-control"
              id="nom"
              value={nom_produit}
              onChange={(event) => setNom_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description du produit:</label>
            <textarea
              type="string"
              placeholder='Description du produit'
              className="form-control"
              id="description"
              value={description_produit}
              onChange={(event) => setDescription_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prix">Prix du produit:</label>
            <input
              type="string"
              placeholder='Prix du produit'
              className="form-control"
              id="prix"
              value={prix_produit}
              onChange={(event) => setPrix_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre du produit:</label>
            <input
              type="number"
              placeholder='Nombre du produit'
              className="form-control"
              id="nombre"
              value={nombre_produit}
              onChange={(event) => setNombre_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Insérer l'image du produit:</label>
            <input
              className="form-control"
              type="file"
              name='image'
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categorieId">Catégorie:</label>
            <select
              className="form-control"
              id="categorieId"
              value={categorieId}
              onChange={(event) => setCategorieId(event.target.value)}
            >
              <option value="">--Choisir une catégorie--</option>
              {categories.categorie && categories.categorie.map(categorie => (
                <option key={categorie.id} value={parseInt(categorie.idcategorie)}>
                  {categorie.nom_categorie}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">
            Ajouter le produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ajoutproduit;
