import React, { useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Fade from 'react-reveal/Fade';
import styles from './Home.module.scss';
import Loading from '../../Shared/Components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedGame } from '../../Shared/Redux/GamesSlice';

export default function Home() {

  const isLoggedIn = localStorage.getItem('userToken');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.gameList);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login')
    }else {
      dispatch(getSortedGame('popularity'));
    }
  },[])

  const renderGames  = useCallback(() => 
    (games.slice(0,3).map(game => 
      (<Col md={6} lg={4} key={game.id}>
          <Fade cascade>
            <Card className={styles.card}> 
              <Card.Img variant="top" src={game.thumbnail} />
              <Card.Body className='py-4 px-3'>
                <div className="d-flex justify-content-between align-items-center">                
                  <Card.Title className={styles.title}>
                    <Link to={`/game-details/${game.id}`} className="stretched-link">
                      {game.title.length > 15 ? `${game.title.slice(0,15)}...` : game.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    <Badge className='text-white p-2'>Free</Badge>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Fade>
        </Col>)
      )
    ), [games])

  return (
    <div>
      <div className={`${styles.homeContent} py-5 px-3`}>
        <h2 className="mb-3 pt-3">
          Find & track the best <span>free-to-play</span> games!
        </h2>
        <p className='mb-4'>
          Track what you've played and search for what to play next! Plus get free premium loot!
        </p>
        <Link to="/all" className="btn mb-3 px-3 pb-2">Browse Games</Link>
      </div>
      <div className={`${styles.homeCards} mt-4 py-4`}>
        <h2 className="mb-5">
          <i className="fa-solid fa-robot me-2"></i>
          Personalized Recommendations
        </h2>
        {games.length > 0 ? 
          <Row className="gy-5 px-4 gx-md-5">
            {renderGames()}
          </Row> : <Loading/>}
      </div>
    </div>
  )
}
