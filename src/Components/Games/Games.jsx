import React, { Fragment, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Loading from '../../Shared/Components/Loading/Loading';
import GameCard from '../../Shared/Components/GameCard/GameCard';
import { useSelector } from 'react-redux';

export default function Games() {
  
  const games = useSelector(state => state.games.gameList);
  const [toggleMore, setToggleMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(games && games.length === 0) {
      setPage(1);
      handleDisable(false);
    }
  }, [games])

  let handleDisable = (flag) => {
    setToggleMore(flag);
  }

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
    : <Loading />
  )
}
