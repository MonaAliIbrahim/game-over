import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Slide from 'react-reveal/Slide';
import styles from './GameCard.module.scss';
import { Link } from 'react-router-dom';

export default function GameCard({gameList, page, fireDisable}) {

  const [currenList, setCurrentList] = useState([]);

  useEffect(() => {
    if(page) {
      // Show List with Pagination
      let limit = page * 10;
      setCurrentList(gameList.slice(0, limit))
    }
    else {
      // Show List from Home
      setCurrentList(gameList);
    }
  }, [gameList, page])

  useEffect(() => {
    if(currenList.length > 0) {
      if(currenList.length === gameList.length) {
        fireDisable(true);
      }
    }
  }, [currenList, gameList, fireDisable])

  return (
    <Row className="mx-auto my-5 g-5">
      {currenList.map((game, idx) => (
        <Col md={6} lg={4} key={idx}>
          <Card className={styles.card}> 
            <Slide top cascade>
              <Card.Img variant="top" src={game.thumbnail} />
              <Card.Body className='pt-4 px-3 pb-0'>
                <div className="d-flex justify-content-between align-items-center">                
                  <Card.Title className={styles.title}>
                    <Link to={`/game-details/${game.id}`} className="stretched-link">
                      {game.title.length > 12 ? `${game.title.slice(0,12)}...` : game.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    <Badge className='text-white p-2'>Free</Badge>
                  </Card.Text>
                </div>
                <Card.Subtitle className={`my-2 ${styles.subtitle}`}>
                  {game.short_description.slice(0,40) + ' ...'}
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer className={`${styles.footer} pb-4`}>
                <i className="fa fa-plus rounded-1"></i>
                <div>
                  <Badge className="p-2">{game.genre}</Badge>
                  <i className={'ps-2 ' + (game.platform.includes('Windows') ? 'fa-windows fa-brands' : 
                      game.platform === 'Web Browser' ? 'fa-computer fa' : 'fa-apple fa-brands')}>
                  </i>
                </div>
              </Card.Footer>
            </Slide>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
