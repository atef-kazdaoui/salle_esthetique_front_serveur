import React, {useState, useEffect} from 'react';
import './RDV.css';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function RDV () {
  const [message, setMessage] = useState ('');
  const [rendezVousDisponibles, setRendezVousDisponibles] = useState ([]);
  const {id} = useParams ();

  useEffect (() => {
    axios
      .get ('http://162.19.25.151:5000/rendez-vous/find')
      .then (res => {
        console.log (res.data.rendezVousDisponibles);
        setRendezVousDisponibles (res.data.rendezVousDisponibles);
      })
      .catch (error => {
        console.log ("ici",error.response.data);
      });
  }, []);

  const handleReservation = (
    date_disponible,
    id_rendez_vous,
    heure_disponible,
    minute_disponible
  ) => {
    const rendezVousData = {
      iduser: id,
      date_disponible: date_disponible,
      heure_disponible: heure_disponible,
      minute_disponible: minute_disponible,
      id_rendez_vous:id_rendez_vous
    };

    axios
      .post ('http://162.19.25.151:5000/rendez-vous/ajouter', rendezVousData)
      .then (res => {
        console.log (res.data);
        setMessage ('Rendez-vous pris avec succès.');
        window.location.reload ();
      })
      .catch (error => {
        console.log (error.response.data);
        setMessage ('Erreur lors de la prise de rendez-vous.');
      });
  };

  return (
    <div className="container">
      <h2>Prise de rendez-vous</h2>

      <div className="scroll-container">
        <h3>Rendez-vous disponibles</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Minute</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rendezVousDisponibles.map (rendezVous => (
              <tr key={rendezVous.id_rendez_vous}>
                <td>{rendezVous.date_disponible}</td>
                <td>{rendezVous.heure_disponible}</td>
                <td>{rendezVous.minute_disponible}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleReservation (
                        rendezVous.date_disponible,
                        rendezVous.id_rendez_vous,
                        rendezVous.heure_disponible,
                        rendezVous.minute_disponible
                      )}
                  >
                    Réserver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RDV;
