import React, { Fragment, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../Shared/Services/Action/GamesAction';
import Loading from '../../Shared/Components/Loading/Loading';
import GameCard from '../../Shared/Components/GameCard/GameCard';

export default function All() {

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.gameList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllGames());
  },[dispatch])

  return (
    games.length > 0 ? 
      <Fragment>
        <GameCard gameList={games} page={page}/> 
        <Col className="text-center mt-2 mb-3">
          <Button className="more-btn py-2 px-3" onClick={() => setPage(page + 1)}>
            More Games <span><i className="fa-solid fa-chevron-right"></i></span>
          </Button>
        </Col>
      </Fragment>
    : <Loading />
  )
}
