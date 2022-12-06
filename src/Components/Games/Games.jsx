import React, { Fragment, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-reveal/Fade';
import Loading from '../../Shared/Components/Loading/Loading';
import GameCard from '../../Shared/Components/GameCard/GameCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSortedGame, getGamesByPlatform, getGamesByCategory } 
  from '../../Shared/Redux/GamesSlice';

export default function Games() {
  
  const games = useSelector(state => state.games.gameList);
  const serverError = useSelector(state => state.games.error);
  const [toggleMore, setToggleMore] = useState(false);
  const [page, setPage] = useState(1);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(games && games.length === 0) {
      setPage(1);
      handleDisable(false);
    }
  }, [games])

  let handleDisable = (flag) => {
    setToggleMore(flag);
  }

  useEffect(() => {
    let {type, name} = params;
    switch(type) {
      case 'platform':
        dispatch(getGamesByPlatform(name));
      break;
      case 'sort':
        dispatch(getSortedGame(name));
      break;
      case 'category':
        dispatch(getGamesByCategory(name));
      break;
      default:
        navigate('/all');
    }
  },[params])

  return (
    games.length > 0 ? 
      <Fragment>
        <GameCard gameList={games} page={page} fireDisable={handleDisable}/> 
        {toggleMore === false ?
        <Col className="text-center mt-2 mb-3">
          <Button className="more-btn py-2 px-3" onClick={() => setPage(page + 1)}>
            More Games <span><i className="fa-solid fa-chevron-right"></i></span>
          </Button> 
        </Col>: null}
      </Fragment>
    : serverError?.length > 0 ? 
      <Row className="justify-content-center align-items-center">
        <Col md="8">
          <Fade cascade>
            <Alert variant="danger" className='text-center'>{serverError}</Alert>
          </Fade>
        </Col>
      </Row>
    : <Loading />
  )
}
