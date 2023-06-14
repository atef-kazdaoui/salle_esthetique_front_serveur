import React, { useState } from 'react';
import axios from 'axios';
import './inscription.css';
import { InfinitySpin } from 'react-loader-spinner'
const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse_domicile, setadresse_domcile] = useState('');
  const [adresse_email, setadresse_email] = useState('');
  const [numero_telephone, setnumero_telephone] = useState('');
  const [password, setpassword] = useState('');
  const [re_password, setCpassword] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [message, setmessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(nom, prenom, adresse_domicile, adresse_email, numero_telephone, password, re_password);
    const formData = new FormData();
    formData.append('image', image); // Ajouter l'image à formData
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('adresse_domicile', adresse_domicile);
    formData.append('adresse_email', adresse_email);
    formData.append('password', password);
    formData.append('re_password', re_password);
    formData.append('numero_telephone', numero_telephone);
    // Ici, vous pouvez envoyer les données du formulaire à votre API
    axios.post(`http://162.19.25.151:5000/users/inscription`, formData).then(res => {
      console.log(res.data);
      setmessage(res.data);
      setTimeout(() => setIsLoading(false), 2000);
    })
      .catch(error => {
        setError(error.response.data); // mise à jour de l'état avec le message d'erreur
        setIsLoading(false);
      });

  };
  return (
    <>
      <div className='inscription'>
        <h1>inscription</h1>

      </div>
      <form onSubmit={handleSubmit} className="form-inscription">

        <div className='container'>
          <div className="form-group">
            <label htmlFor="nom">Nom :</label>
            <input
              type="string"
              placeholder='Votre nom '
              className="form-control"
              id="nom"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prenom :</label>
            <input
              type="string"
              placeholder='Votre prenom '
              className="form-control"
              id="prenom"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse_domicile">Adresse domicile :</label>
            <input
              type="string"
              placeholder='Votre adresse domicile '
              className="form-control"
              id="adresse"
              value={adresse_domicile}
              onChange={(event) => setadresse_domcile(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail :</label>
            <input
              type="email"
              placeholder='Votre adresse email'
              className="form-control"
              id="email"
              value={adresse_email}
              onChange={(event) => setadresse_email(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="string">numero telephone :</label>
            <input
              type="string"
              placeholder='Votre numero de telephone'
              className="form-control"
              id="numero_telephone"
              value={numero_telephone}
              onChange={(event) => setnumero_telephone(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              placeholder='Choisissez une mot de passe'
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setpassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirmation du mot de passe:</label>
            <input
              type="password"
              placeholder='Re-taper votre mot de passe'
              className="form-control"
              id="Cpassword"
              value={re_password}
              onChange={(event) => setCpassword(event.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Inserer votre image</label>
            <input class="form-control" type="file" name='image' onChange={(event) => setImage(event.target.files[0])} />
          </div>
          <button type="submit" className="btn btn-primary">
            Inscription
          </button>
          {message ? <div className="alert alert-success">{message}</div> : error && <div className="alert alert-danger">{error}</div>}
        </div>
        {isLoading && ( // display the spinner if isLoading is true
          <div className="spinner-container">
          {isLoading && (
            <InfinitySpin 
              height='200'
              width='200'
              color="#4fa94d"
              id='infinitySpin'
            />
          )}
        </div>
        )}
      </form>
    </>
  );
};
export default Inscription;

