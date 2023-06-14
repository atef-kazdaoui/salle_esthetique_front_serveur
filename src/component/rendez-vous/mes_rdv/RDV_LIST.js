import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../mes_rdv/RDV_list.css'; // Import the CSS file for this component

function RDV_LIST() {
  const [rendezVousList, setRendezVousList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://162.19.25.151:5000/rendez-vous/mes_rendez_vous/${id}`)
      .then((res) => {
        setRendezVousList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container">
      <h2 className="page-title">Prise de rendez-vous</h2>

      <div className="scroll-container">
        <h3 className="section-title">Vos rendez-vous</h3>
        <Table striped bordered hover responsive className="rdv-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Minute</th>
            </tr>
          </thead>
          <tbody>
            {rendezVousList.map((rendezVous) => (
              <tr key={rendezVous.id_rendez_vous}>
                <td>{rendezVous.date_disponible}</td>
                <td>{rendezVous.heure_disponible}</td>
                <td>{rendezVous.minute_disponible}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RDV_LIST;
