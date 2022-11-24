import React, { useState, useEffect, useLayoutEffect } from 'react'; 
import styles from './GameDetails.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Carousel from 'react-bootstrap/Carousel'
import Loading from '../../Shared/Components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails } from '../../Shared/Services/Action/GamesAction';

export default function GameDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector(state => state.games.game);
  const [toggleLoading, setToggleLoading] = useState(false);

  useLayoutEffect(() => {
    dispatch(getGameDetails(id));
  }, [dispatch, id])

  useEffect(() => {
    if(game && Object.keys(game).length > 0) {
      setToggleLoading(true);
    }
  }, [game])

  return (
    !toggleLoading ? <Loading /> :
      <Row className="mt-5">
        <Col md="6">
          <Card className={`${styles.imageGame} my-3`}>
            <Card.Img variant="top" src={game.thumbnail} />
            <Card.Body className='d-flex justify-content-between'>
              <Badge bg="gradient" className="text-uppercase d-flex align-items-center py-2 px-3">
                free
              </Badge>
              <a href={game.game_url} target="_blanck" className='btn ms-2 flex-grow-1'>
                play game <i className='fa fa-arrow-right-to-bracket px-2'></i>
              </a>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          <Card className={styles.contentGame}>
            <Card.Body>
              <Card.Title className="mb-4">{game.title}</Card.Title>
              <Card.Subtitle className="text-muted">About {game.title}</Card.Subtitle>
              <Card.Text>{game.description}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Subtitle className="my-2 fw-bold">
                Minimum System Requirements
              </Card.Subtitle>
              <ListGroup className={styles.requireList}>
                {game.minimum_system_requirements &&
                  Object.entries(game.minimum_system_requirements).map(([key, value], idx) => (
                    <ListGroup.Item key={idx}>
                      <span>{key} : </span>{value}
                    </ListGroup.Item>)
                  )}
              </ListGroup>
            </Card.Body>
            <Card.Body>
              <Card.Text className="fw-bold">{game.title} Screenshots</Card.Text>
              <Col xs="12">
                <Carousel fade controls={false} indicators={false} interval="1000">
                  {game.screenshots?.map(({image, id}) =>
                    (<Carousel.Item key={id}> 
                      <img src={image} alt="game Screenshot" className='w-100'/>
                    </Carousel.Item>))}                  
                </Carousel>
              </Col>
              <Card.Subtitle className="mt-5 mb-4 fw-bold">Additional Information</Card.Subtitle>
              <Row>
                <Col md="4" sm="6">
                  <h6>Title</h6>
                  <p>{game.title}</p>
                </Col>
                <Col md="4" sm="6">
                  <h6>Developer</h6>
                  <p>{game.developer}</p>
                </Col>
                <Col md="4" sm="6">
                  <h6>Publisher</h6>
                  <p>{game.publisher}</p>
                </Col>
                <Col md="4" sm="6">
                  <h6>Release Date</h6>
                  <p>{game.release_date}</p>
                </Col>
                <Col md="4" sm="6">
                  <h6>Genre</h6>
                  <p>{game.genre}</p>
                </Col>
                <Col md="4" sm="6">
                  <h6>Platform</h6>
                  <p>
                    <i className={'pe-1 ' + (game.platform === 'Windows' ? 'fa-windows fa-brands' : 
                        game.platform === 'Web Browser' ? 'fa-computer fa' : 'fa-apple fa-brands')}>
                    </i>
                    {game.platform}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  )
}
